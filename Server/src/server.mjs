import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schemas/index.js";
import { resolvers } from "./resolvers/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import "dotenv/config";
import "./firebase/config.js";
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rjbqjro.mongodb.net/`;
const PORT = process.env.PORT || 4000;
import { getAuth } from "firebase-admin/auth";
// const port = parseInt(process.env.APP_PORT);
const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/",
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

const authorizationJWT = async (req, res, next) => {
  const authorizationHeaders = req.headers.authorization;
  if (authorizationHeaders) {
    const accessToken = authorizationHeaders.split(" ")[1];
    try {
      const decodedToken = await getAuth().verifyIdToken(accessToken);

      res.locals.uid = decodedToken.uid;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Foridden", error: err });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

app.use(
  cors(),
  bodyParser.json(),
  authorizationJWT,
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid };
    },
  })
);
mongoose.set("strictQuery", false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to DB");
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log("🚀 Server ready at http://localhost:4000");
  });

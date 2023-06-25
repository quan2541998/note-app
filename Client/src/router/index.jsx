import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AuthProvider from "../context/AuthProvider";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import NoteList from "../components/NoteList";
import Note from "../components/Note";
import { noteLoader, notesLoader, updateNote } from "../utils/noteUtils";
import { foldersLoader } from "../utils/FolderUtils";
import { addNewNote } from "../utils/noteUtils";
const AuthLayout = () => {
  return <AuthProvider><Outlet /></AuthProvider>;
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: '/',
            loader: foldersLoader,
            children: [{
              path: 'folders/:folderId',
              element: <NoteList />,
              action: addNewNote,
              loader: notesLoader,
              children: [{
                path: 'note/:noteId',
                element: <Note />,
                action: updateNote,
                loader: noteLoader,
              },
              ]
            }
            ]
          }
        ],
      },
    ],
  },
]);

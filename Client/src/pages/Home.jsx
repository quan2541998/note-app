import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import UserProfile from "../components/UserProfile";
import ForderList from "../components/ForderList";
import { Outlet, useLoaderData } from "react-router-dom";



const Home = () => {
  const { folders } = useLoaderData()
  return (
    <>
      <Typography variant="h4" sx={{ mb: '20px' }}>Note-App</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'right', mb: '10px' }}>
        <UserProfile />
      </Box>
      <Grid container sx={{ height: '50vh', boxShadow: ' 0 0 15px 0 rgb( 193 193 193 / 60%)', padding: '10px', overflow: 'hidden' }} spacing={1}>
        <Grid item xs={3}>
          <ForderList folders={folders} />
        </Grid>
        <Grid item xs={9}>
          <Outlet></Outlet>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
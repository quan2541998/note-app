import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router';
import './index.css'
import { RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/material"
import './firebase/config.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

  <Container maxWidth='lg' sx={{ textAlign: 'center', marginTop: '50px' }}>
    <RouterProvider router={router} />
  </Container>

)

import React, { Suspense, useState } from 'react';
import {  RouterProvider } from "react-router-dom";
//import routes from "./routes";
/* import DefaultLayout from './layouts/DefaultLayout';
import Dashboard from './pages/Dashboard';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import AppLayout from './layouts/AppLayout';
import Expired from './pages/Expired';
import Signout from './components/Singout'
import UserProfiles from './pages/Profile'
import Clients from './pages/Clients'
import Calendar from './pages/Calendar'

import PrivateRoute from './components/PrivateRoute'; */
import router from './routes';
function App() {

  //const router = createBrowserRouter(routes);
  //.log(router);
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}


const Error404 = ()=>{

  return (<div>404</div>)
}

export default App
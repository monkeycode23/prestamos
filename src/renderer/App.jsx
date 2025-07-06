import React, { Suspense, useState } from 'react';
import { createBrowserRouter, RouterProvider,HashRouter,Routes,Route } from "react-router-dom";
import routes from "./routes";
import DefaultLayout from './layouts/DefaultLayout';
import Dashboard from './pages/Dashboard';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import AppLayout from './layouts/AppLayout';
import Expired from './pages/Expired';
import Signout from './components/Singout'
import UserProfiles from './pages/Profile'
import Clients from './pages/Clients'








function App() {

  const router = createBrowserRouter(routes);
  console.log(router);
  return (
    <div>
        <HashRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />

             <Route path="/profile" element={<UserProfiles />} />

            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="expired" element={<Expired />} />
              
               <Route path="logout" element={<Signout/>} />

            </Route>
            <Route path='*' element={<Error404/>}></Route>
          </Routes>
        </HashRouter>

    </div>
  );
}


const Error404 = ()=>{

  return (<div>404</div>)
}

export default App
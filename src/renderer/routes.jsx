// ✅ modules solo busca dentro de ./pages

import React from 'react';

const modules = require.context('./', true, /\.jsx$/);



export function route(path, filePath) {
  return {
    path,
    lazy: async () => {
      const module = await modules(`./${filePath}`);
      return { Component: module.default };
    },
  };
}

export function index(filePath) {
  return {
    index: true,
    lazy: async () => {
      const module = await modules(`./${filePath}`);
      return { Component: module.default };
    },
  };
}

export function layout(filePath, children) {
  return {
    lazy: async () => {
      const module = await modules(`./${filePath}`);
      return { Component: module.default };
    },
    children,
  };
}

export function prefix(path, children) {
  return [{ path, children }];
}


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
import ClientPage from './pages/ClientPage';
import Calendar from './pages/Calendar'
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';

import { clientsLoader } from './pages/Clients';
//import { cli } from 'webpack';

// Puedes definir tus rutas con loader aquí
const router = createHashRouter([
  {
    path: '/',
    element: <PrivateRoute><AppLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: async () => {
          //const data = await fetch('/api/dashboard-data');
          
          return {}
        },
      },
      {
        path:"dashboard",
        element: <Dashboard />,
        loader: async () => {
          //const data = await fetch('/api/dashboard-data');
          
          return {}
        },
      },
      {
        path:"calendar",
        element: <Calendar />,
        loader: async () => {
          //const data = await fetch('/api/dashboard-data');
          return {}
        },
      },
      {
        path: 'clients',
        element: <Clients />,
        loader: clientsLoader,
      },

      {
        path: 'clients/:id',
        element: <ClientPage />,
        loader: clientsLoader,
      },
      {
        path: 'profile',
        element: <UserProfiles />,
        loader: async () => {
          //const res = await fetch('/api/clients');
          return {}
        },
      },
      // ...otras rutas protegidas
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'logout',
        element: <Signout />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  
]);


export default router
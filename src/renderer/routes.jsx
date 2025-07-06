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
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const routes =[
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

console.log(routes);

export default routes;

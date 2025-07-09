import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './global.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from './context/ThemeContext';

const container = document.getElementById('root');
const root = createRoot(container);

import { ToastContainer } from 'react-toastify';




root.render(
    <ThemeProvider>
        <Provider store={store}>
            <ToastContainer position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light" />

            <App />
        </Provider>
    </ThemeProvider>
);
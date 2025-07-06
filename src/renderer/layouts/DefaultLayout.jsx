import React from "react";
import { Link, Outlet } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";


const DefaultLayout = () => {
    return (
      
        <div>
            <h1>Default Layout</h1>
            <Link to="/">Go to Home</Link>
            <Link to="/auth/login">Go to Login</Link>
            <Outlet />
        </div>
      
    );
};

export default DefaultLayout;
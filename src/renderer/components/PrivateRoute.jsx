import React from "react";

import { useNavigate,Navigate  ,Outlet} from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setIsSessionExpired,setUser } from "../redux/slices/authSlice";


const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    
    const { user,token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    useEffect(() => {
        // Check if the user is authenticated
        const checkSessionExpired = async () => {
            // Check if the token is valid
            const isExpired = await window.electron.token.verify(token);

            
           
            console.log('Token verification result:', isExpired);
            if (!isExpired) {
                // If the token is expired, redirect to login
                setIsSessionExpired(true);
                navigate('/auth/expired');

                
            }

             dispatch(setUser(isExpired.user))
        };  

         
        if (!user && !token) {
            console.log('No user');
            navigate("/auth/login")
        }  
        else{
            checkSessionExpired();
        }

        

       
    }, []);
    
   
    
    if(token)
    return (
        <div>
           
            {children}
        </div>
    );
};

export default PrivateRoute;
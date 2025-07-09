//import PageMeta from "../components/common/PageMeta";
//import AuthLayout from "../layouts/AuthLayout";
import React, { useEffect } from "react";
import SignUpForm from "../components/auth/SignUpForm.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";


export default function SignUp() {

  const {token,isSessionExpired} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  useEffect(() => { 

    // Check if the user is already authenticated
    if (token &&  isSessionExpired) {  
      // Redirect to the dashboard if authenticated
      navigate('/'); // Redirect to the dashboard or home page
    } 
  }
  , []);
  // If the user is authenticated, redirect to the dashboard
  // This will prevent the signup page from being displayed if the user is already logged in

  return (
    <>
     {/*  <PageMeta
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      /> */}
     
        <SignUpForm />
     
    </>
  );
}

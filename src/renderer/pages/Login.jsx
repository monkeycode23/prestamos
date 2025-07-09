import React,{useEffect} from "react";
//import PageMeta from "../components/common/PageMeta";
//import AuthLayout from "../layouts/AuthLayout";
import SignInForm from "../components/auth/SingInForm";
import { useSelector } from "react-redux";
export default function SignIn() {

  const {token,isSessionExpired} = useSelector(state=>state.auth)
  useEffect(() => { 
    
    console.log("login")
      // Check if the user is already authenticated
      if (token &&  isSessionExpired) {  
        // Redirect to the dashboard if authenticated
        navigate('/'); // Redirect to the dashboard or home page
      } 
    }
    , []);

  return (
    <>
     {/*  <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />  */}
     <SignInForm />
   

    </>
  );
}

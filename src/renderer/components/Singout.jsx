import React,{useEffect}  from "react";
import {logout} from '../redux/slices/authSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Signout=()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{

        dispatch(logout())
        navigate("/auth/login")    
    },[])

    return 

}


export default Signout
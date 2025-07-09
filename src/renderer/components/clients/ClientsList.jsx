
import React, { useState } from "react"
import {User,User2 as GroupIcon,ArrowBigDown as ArrowUpIcon,Handshake} from 'lucide-react'
import { useSelector,useDispatch } from "react-redux";
import {openModal} from '../../redux/slices/modalSlice'
import Button from "../ui/button/Button";
import ClientFilter from "./ClientFilter";
import Badge from "../ui/badge/Badge";
import { Link } from "react-router";
import Pagination from '../Pagination';

function ClientsList() {
  const [clients,setClients] = useState([{id:1,name:"pedro"},{id:2,name:"juan"}])
      const dispatch = useDispatch()
  

  if(!clients.length) return (
  <div className="h-screen-70 flex justify-center flex-col text-gray-400 items-center border border-gray-200 rounded-2xl">
    <span className="text-3xl p-5 bg-gray-300 rounded-full"><User className=""></User></span>
    <h1 className="font-bold text-2xl">No se encontron clientes</h1>
    <p className="mb-2">Agrega  tu primer cliente al sistema</p>
    <Button  onClick={()=>dispatch(openModal())} >nuevo cliente</Button>
{/* <button className="p-2 rounded-md bg-success-500 text-white" ></button>
 */}    
  </div>)
  return (
    <div className="rounded-2xl border   border-gray-200 bg-white ">
      <ClientFilter></ClientFilter>
      <div className="flex justify-between">
        <div className="ml-4">
          <Button onClick={()=>dispatch(openModal())} size="sm" >nuevo cliente</Button>
        </div>
        <Pagination></Pagination>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4   md:gap-6 mb-5  sm:grid-cols-1 sm:gap-2 rounded-2xl  p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      {/*  <div className="col-span-12">
           <Pagination  />
        </div> */}
      
      {clients.map(client => (<ClientCard key={client.id} id={client.id} name={client.name}></ClientCard>))}
    </div>
    </div>
  )
}

import { CreditCard, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';

import { UserRound, CalendarDays } from 'lucide-react';

const ClientCard = ({ name }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
          <UserRound size={32} />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-500">cliente desde {"23/a23/20"}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 text-sm text-gray-700">
        <div>
          <p className="font-medium text-gray-500 flex gap-1 rounded-full border border-gray-200 p-2">
            <Handshake></Handshake> 
            <span className="flex  justify-between w-full">
              <label>
                2/10
              </label>
              <label >6</label>
              <label>2</label>
              <label>0</label>
            </span>
            </p>
          
        </div>

        <div>
          <p className="font-medium text-gray-500 flex gap-1 rounded-full border border-gray-200 p-2">
            <CreditCard />
            <span className="flex   w-full">
              <label className="rounded-full text-xs   bg-blue-500 text-white flex items-center">
                2
              </label>
              <label >6</label>
              <label>2</label>
              <label>0</label>
            </span>
            </p>
          
        </div>

        
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
        <CalendarDays size={18} className="text-blue-500" />
        <span>Próximo pago: </span>
        <span className="font-medium text-gray-800">{"12/12/2012"}</span>
      </div>
    </div>
  );
};



/* 
function ClientCard({id,name}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">

     <div className="flex gap-2">
       <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
       
      </div>
      <span className="font-bold text-lg flex flex-col mb-3">
        <Link to={"/clients/"+id}>
          {name}
        </Link>

         <span className="text-sm text-gray-500 dark:text-gray-400 flex  items-center justify-center gap-2 bg-green-400 text-white p-1 rounded-md">
            <Handshake></Handshake> 
            <span className="bg-white text-gray-500 rounded-full p-1"><label >1</label> 
              /10</span>
            <span>
              <label className="text-xs ">activos</label> 9</span>
          </span>
      </span>
     </div>

      <div className="flex items-end justify-between mt-5">
        <div>
         
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            204
          </h4>
        </div>
        <Badge color="success">
          <ArrowUpIcon />
          11.01%
        </Badge>
      </div>
    </div>
  )
}
 */




export default ClientsList
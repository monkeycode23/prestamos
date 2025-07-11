import React, { useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
//import PageMeta from "../components/common/PageMeta";

import { useSelector, useDispatch } from "react-redux";
//import { useModal } from "../hooks/useModal";

import { openModal, closeModal } from "../redux/slices/modalSlice";

import ClientsService from "../services/ClientsService";
import LoansService from "../services/LoansService";
import { setClient } from "../redux/slices/clientsSlice";
import { useParams } from 'react-router-dom';

//import EditModalClient from "../components/client/EditModalClient";
import ClientMetaCard from "../components/client/ClientMetaCard";


export default function ClientPage() {

  const { id } = useParams();

  const dispatch = useDispatch();

  const client = useSelector((state) => state.clients.client);


  useEffect(() => {


    async function fetchClients() {
      try {

        //  console.log("pagination", pagination)
        const clientsService = await new ClientsService();
        const clientData = await clientsService.getClientById(id);
        console.log("clientData", clientData)
        /* dispatch(setClients(clientsData.clients || []));
        dispatch(setTotalItems(clientsData.total || 0)); */
        // dispatch(setPaginationData(clientsData.paginationData));
        dispatch(setClient(clientData || {}));


      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    }

    fetchClients();

  }, [/* data, dispatch,pagination.page,pagination.filter */]);


  
    useEffect(() => {
      
      async function fetchLoansClients() { 
        try {
  
          //console.log("pagination", pagination)
          const loansService = new LoansService()
  
          const loansData  =await loansService.getClientLoans({
            client_id:id
          })
  
  
          console.log(loansData,"loansasdasda")
  
         /*  dispatch(setClients(clientsData.clients || []));
          dispatch(setTotalItems(clientsData.total || 0)); */
         // dispatch(setPaginationData(clientsData.paginationData));
  
        } catch (error) {
          console.error("Error fetching clients:", error);
        }
      }
      
      fetchLoansClients();

    }, []);
  
  

  return (
    <div>
      <PageBreadcrumb pageTitle={"Cliente"} />
      <ClientStatCards></ClientStatCards>
      <div className="grid grid-cols-12 gap-5">
      <ClientLoansPayments />
      <ClientMetaCard></ClientMetaCard>
      </div>
      

      

    </div>
  );
}

import PaymentsList from "../components/payments/PaymentsList";

const ClientLoansPayments=()=>
{

  return (<div className="flex flex-col gap-3 col-span-8 p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
     
     <LoansList></LoansList>
     <PaymentsList></PaymentsList>
    </div>)
}


import Badge from "../components/ui/badge/Badge";
import LoansList from "../components/client/LoansList";
//import PaymentsList from "../components/client/PaymentsList";


const ClientStatCards = () => {



  return (<div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6 mb-6">

    {/* <!-- Metric Item Start --> */}
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Prestamos en curso
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            4
          </h4>
        </div>
        <Badge color="success">
          {/* <ArrowUpIcon />
          11.01% */}
        </Badge>
      </div>
    </div>
    {/* <!-- Metric Item End --> */}

    {/* <!-- Metric Item Start --> */}
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        {/* <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" /> */}
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Prestado
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            $1.000.000
          </h4>
        </div>

        <Badge color="error">
         {/*  <ArrowDownIcon />
          9.05% */}
        </Badge>
      </div>
    </div>
    {/* <!-- Metric Item End --> */}

    {/* <!-- Metric Item Start --> */}
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Devuelto
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            $500.000
          </h4>
        </div>
        <Badge color="success">
          {/* <ArrowUpIcon />
          11.01% */}
        </Badge>
      </div>
    </div>
    {/* <!-- Metric Item End --> */}

    {/* <!-- Metric Item Start --> */}
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Restante Por devolver
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            $500.000
          </h4>
        </div>
        <Badge color="success">
          {/* <ArrowUpIcon />
          11.01% */}
        </Badge>
      </div>
    </div>
    {/* <!-- Metric Item End --> */}
  </div>)
}










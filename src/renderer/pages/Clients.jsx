import React, { useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
//import PageMeta from "../components/common/PageMeta";
import {
  ArrowDown as ArrowDownIcon,    // para ArrowDownIcon
  ArrowUp as ArrowUpIcon,      // para ArrowUpIcon
  Box as BoxIconLine,         // para BoxIconLine (no hay BoxIconLine exacto, pero Box es similar)
  Users as GroupIcon,        // para GroupIcon (en lucide se llama Users)
} from "lucide-react";

import Badge from "../components/ui/badge/Badge";
import { useSelector } from "react-redux";
import { useModal } from "../hooks/useModal";

import { setPaginationData } from "../redux/slices/pagination"
import AddClientModal from "../components/clients/AddClientModal";
import ClientsList from "../components/clients/ClientsList"

export default function Clients() {

        const { isOpen, openModal, closeModal } = useModal();
  

  useEffect(() => {
    console.log(isOpen)
    setPaginationData({
      page: 1,
      totalItems: 20,
      limit: 10,
    })

  },[])
  return (
    <div>
      {/* <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      /> */}
      
      <PageBreadcrumb pageTitle="Clientes" />

     {/*  <ClientPageCards></ClientPageCards> */}
      {/* <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Card Title Here
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Start putting content on grids or panels, you can also use different
            combinations of grids.Please check out the dashboard and other pages
          </p>
        </div>
      </div> */}

      {/*  <FilterClients></FilterClients> */}
      <ClientsList></ClientsList>
     <AddClientModal ></AddClientModal>
    </div>
  );
}















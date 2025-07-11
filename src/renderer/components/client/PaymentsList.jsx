import React from "react";
import Button from "../ui/button/Button";

const PaymentsList = ({ client, handleEdit }) => {


  return (
   
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        
        <div>

            <div>
            filter
        </div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Pagos 
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your pagos and repayments.
          </p>
        </div>
       
      </div>
   
  );
}


export default PaymentsList
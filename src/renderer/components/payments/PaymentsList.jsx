import React, { useState, useEffect } from "react";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";
import PaymentCard from "./PayentsCard";
import PaymentListItem from "./PaymentListItem";
import Pagination from '../Pagination';
import {
    Filter,
    X,
    ChevronDown,
    CheckCircle,
    AlarmClock,
    Clock,
    AlertCircle
} from 'lucide-react';
import PaymentsFilter from "./PaymentsFilter";

const PaymentsList = ({ client, handleEdit }) => {


    useEffect(() => {

        const fetchPayments = async (params) => {

        }

        fetchPayments()
        return () => {

        }


    }, [])


    const [payments, setPayments] = useState([
        {
            id: 1,
            amount: 12323
        },
        {
            id: 2,
            amount: 12323
        },
        {
            id: 3,
            amount: 12323
        }
    ])

    return (

        <div className="flex flex-col gap-6 ">


            <div className="flex justify-between">
                <PaymentsFilter></PaymentsFilter>
               {/*   */}
            </div>
            <div className="w-full ">

                {
                    payments.map((payment) => (<PaymentListItem payment={payment} key={payment.id}></PaymentListItem>))
                }
            </div>



        </div>

    );
}








export default PaymentsList
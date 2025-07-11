







import React,{useState} from "react"

import {MoreHorizontal as MoreDotIcon,CreditCard}from 'lucide-react'

import {Dropdown} from '../ui/dropdown/Dropdown'
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import Badge from "../ui/badge/Badge";
import { useSelector,useDispatch } from "react-redux";
import {addItem,removeItem}  from '../../redux/slices/selectionSlice'




const PaymentListItem=({payment})=>{
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch()

  const selectedItems = useSelector(state=>state.selection)

 function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  
  function closeDropdown() {
    setIsOpen(false);
  }


  function selectItem(e){

    dispatch(addItem(payment))

  }
    return (<div
    
    onClick={selectItem}
    
    className="w-full mb-2 rounded-md flex gap flex-row bg-white justify-between p-4 border border-gray-200  shadow-sm">

        <span>
            <CreditCard></CreditCard>
        </span>
        <span className="">
            Pago 1
        </span>
        <span className="">
            $12.000
        </span>
        <span className="">
          <Badge color="success" >Pagado</Badge>
        </span>
        <span className="">
            12/12/2023
        </span>
        <span className="">
              <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
        </span>
    </div>)
}


export default PaymentListItem
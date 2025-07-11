
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, changeName } from '../../redux/slices/modalSlice';
import { Modal } from '../ui/modal';
import Label from '../../form/Label';
import Input from '../../form/input/InputField';
import Button from '../ui/button/Button';
import DatePicker from '../../form/date-picker';
import Select from '../../form/Select';
import { Calendar as CalenderIcon } from "lucide-react";
import useValidation from '../../hooks/useValidator'
import Spinner from '../Spinner';
import { useState } from 'react';
import { changeValue, setInputs, setLoading } from '../../redux/slices/formSlice';
import Loan from '../../services/local/Loan';
import { useParams } from 'react-router';
const AddLoanModal = ({ client, onClose, onSave }) => {

  const {id} = useParams()
  const modal = useSelector(state => state.modal)
    const {user} = useSelector(state => state.auth)

   

  const dispatch = useDispatch()
  const { validate, validations, errors } = useValidation()
  const [isLoading, setIsLoading] = useState()
  const { inputs } = useSelector(state => state.form)
  const options = [
    { value: "daily", label: "diario" },
    { value: "weekly", label: "semanal" },
    { value: "monthly", label: "mensual" },
    { value: "forthnighty", label: "quincenal" },
    { value: "custom", label: "personalizado" },
  ];


  useEffect(() => {

    //console.log(id)
    dispatch(setInputs({
      amount: 50000,
      interest_rate: 30,
      disbursement_date: new Date().toISOString(),
      first_payment_date: new Date().toISOString(),
      term: "daily",
      installments: 1,
      client_id:id,
      user_id:user.id
    }))
    //dispatch(changeName("ADD_LOAN"))

    

    return () => {

    }
  }, [])


  async function onSubmit(e) {
    
    setIsLoading(true)
    const _errors = await validate({
      amount:[
        validations.required({message:"Este valor es requerido"}),
        validations.numeric(),
        validations.minValue({value:10000}),
        validations.maxValue({value:10000000})
      ],
      interest_rate:[
        validations.required({message:"Este valor es requerido"}),
        validations.numeric({message:"Este valor debe ser un numero"}),
        validations.minValue({value:0}),
        validations.maxValue({value:100})
      ],
      installments:[
        validations.required({message:"Este valor es requerido"}),
        validations.numeric(),
        validations.minValue({value:1}),
        validations.maxValue({value:100})
      ],
      term:[
        validations.required({message:"Este valor es requerido"}),
        validations.alpha(),
        validations.matchValues({match:[ "daily","weekly", "monthly","forthnighty","custom"]})
        
      ],
       disbursement_date:[
        validations.required(),
        
      ],
      first_payment_date:[
        validations.required(),
      ]
    })


    if(Object.keys(_errors).length){
      return
    }

    console.log(inputs)
    const loan = new Loan({
      amount:inputs.amount,
      interest_rate:inputs.interest_rate,
      disbursement_date:inputs.disbursement_date,
      firstPaymentDate:inputs.first_payment_date,
      term:inputs.term,
      installments:inputs.installments,
      client_id:inputs.client_id,
      user_id:inputs.user_id
    })


    console.log(loan)
    await loan.insert()

    setTimeout(()=>{

      setIsLoading(false)
    },1000)
  }

  function handleSelectChange(val) {

    dispatch(changeValue({key:"term",value:val}))
  }

  return (<Modal name={"ADD_LOAN"} className="max-w-[700px] m-4">
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto   rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Presta Dinero
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          
        </p>
      </div>
      <form className="flex flex-col">
        <div className="custom-scrollbar overflow-y-auto  px-2 pb-3">
          <div>
            {/* <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Social Links
                </h5>
 */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Monto a Prestar</Label>
                <Input
                  error={errors.amount || false}

                  onChange={(e) => dispatch(changeValue({ key: "amount", value: e.target.value }))}
                  value={inputs.amount || 50000}
                  type="number"
                />
                 {
                errors.amount ?
                  (
                    <span className='text-red-600'>
                      {errors.amount}
                    </span>
                  ) : ""
              }
              </div>
             
              <div>
                <Label>Interes %</Label>
                <Input
                  error={errors.interest_rate || false}

                  onChange={(e) => dispatch(changeValue({ key: "interest_rate", value: e.target.value }))}
                  value={inputs.interest_rate || 30}
                  type="number" />
                {
                  errors.interest_rate ?
                    (
                      <span className='text-red-600'>
                        {errors.interest_rate}
                      </span>
                    ) : ""
                }
              </div>

              <div>

                <DatePicker
                  id="date-picker"
                  label="Fecha de desenbolso"
                  placeholder="Select a date"
                  onChange={(dates, currentDateString) => {
                    // Handle your logic
                    console.log({ dates, currentDateString });
                    dispatch(changeValue({ key: "disbursement_date", value: currentDateString }))
                  }}
                />

                {
                  errors.disbursement_date ?
                    (
                      <span className='text-red-600'>
                        {errors.disbursement_date}
                      </span>
                    ) : ""
                }
              </div>



              <div>
                <DatePicker
                  id="date-picker"
                  label="Fecha de primer pago"
                  placeholder="Select a date"
                  defaultDate={new Date()}
                  onChange={(dates, currentDateString) => {
                    // Handle your logic
                    console.log({ dates, currentDateString });
                    dispatch(changeValue({ key: "first_payment_date", value: currentDateString }))

                  }}

                  
                />

                
                {
                  errors.first_payment_date ?
                    (
                      <span className='text-red-600'>
                        {errors.first_payment_date}
                      </span>
                    ) : ""
                }
              </div>
            </div>
          </div>
          <div className="mt-7">
            {/* <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5> */}

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1">
                <Label>Numero de Cuotas</Label>
                <Input 
                error={errors.installments || false}
                onChange={(e)=>dispatch(changeValue({key:"installments",value:e.target.value}))}
                value={inputs.installments || 1} 
                type="number" 
                />
                {
                  errors.iinstallments ?
                    (
                      <span className='text-red-600'>
                        {errors.installments}
                      </span>
                    ) : ""
                }
              </div>

              <div className="col-span-2 lg:col-span-1">
                <div>
                  <Label>Periodo de pago</Label>
                  <Select
                    options={options}
                    placeholder="periodo"
                    onChange={handleSelectChange}
                    className="dark:bg-dark-900"
                    defaultValue={inputs.term || "daily"}
                  />
                </div>
              </div>

            
              {/*  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input type="text" value="randomuser@pimjo.com" />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input type="text" value="+09 363 398 46" />
                  </div>

                  <div className="col-span-2">
                    <Label>Bio</Label>
                    <Input type="text" value="Team Manager" />
                  </div> */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={() => dispatch(closeModal())}>
            Close
          </Button>
          <Button


            size="sm" onClick={onSubmit}>
            {
              isLoading ? (<Spinner></Spinner>) : "prestar"
            }
          </Button>
        </div>
      </form>
    </div>
  </Modal>)
}



export default AddLoanModal;
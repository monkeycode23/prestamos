



import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setInputs, resetForm, changeValue } from '../../../redux/slices/formSlice';
import { useWizzar } from '../../FormWizzard';
import Input from '../../../form/input/InputField';
import Label from '../../../form/Label';
import useValidation from '../../../hooks/useValidator';
import Client from '../../../services/local/Client';



const Step4 = ({ step }) => {

  const { currentStep, registerOnFinish, setIsLoading } = useWizzar()
  const { validate, validations, errors } = useValidation()
  const { inputs } = useSelector(state => state.form)
  const dispatch = useDispatch()



  useEffect(() => {

    registerOnFinish(async () => {
     // setIsLoading(true)
        
        console.log("inputs", inputs)
    })
    return () => {

    }
  }, [inputs])

  if (currentStep != step) return

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-10 text-center">Agregar cliente </h2>
      
        <div className='flex  justify-center items-center '>
            
            
            <div className='w-1/2'>
                <Label>Nickname</Label>
                <Label>Nombre y Apellido</Label>
                <Label>Direccion</Label>
                <Label>Email</Label>
                <Label>Telefono</Label>
                
                
            </div>
            <div className='w-1/2'>
                <Label>{inputs.nickname}</Label>
                <Label>{inputs.phone  ? inputs.phone:"N/A"}</Label>

                 <Label>{inputs.name ? inputs.name:"N/A" +" "+inputs.lastname ? inputs.lastname:"N/A"}</Label>
                  <Label>{inputs.houseStreet ? inputs.houseStreet:"N/A"+" "+inputs.houseNumber ? inputs.houseNumber:"N/A"}</Label>
                   <Label>{inputs.email ? inputs.email:"N/A"}</Label>
                    <Label>{inputs.phone  ? inputs.phone:"N/A"}</Label>
            </div>
        </div>

    </div>)
}



export default Step4
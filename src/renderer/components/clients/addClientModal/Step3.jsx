

import React, { useEffect } from 'react'

import { useSelector, useDispatch } from "react-redux";
import { setInputs, resetForm, changeValue } from '../../../redux/slices/formSlice';
import { useWizzar } from '../../FormWizzard';
import Input from '../../../form/input/InputField';
import Label from '../../../form/Label';
import useValidation from '../../../hooks/useValidator';
import PhoneInput from '../../../form/group-input/PhoneInput';
import Client from '../../../services/local/Client';
import { SendHorizonal as EnvelopeIcon } from 'lucide-react';



const Step3 = ({ step }) => {

  const { currentStep, disableNext, registerOnNext, setIsLoading, isLoading, nextStep } = useWizzar()
  const { validate, validations, errors } = useValidation()
  const { inputs } = useSelector(state => state.form)
  const dispatch = useDispatch()



  useEffect(() => {


    registerOnNext(async () => {

      const syncValidation = await validate({
        email: [
          validations.optional(),
          validations.email({ message: 'El email no es válido' }),
          validations.minLength({ min: 5, message: 'Este campo debe tener al menos 5 caracteres' }),
          validations.maxLength({ max: 50, message: 'Este campo debe tener menos de 10 caracteres' }),
          //validations.alphanumeric({  message: 'Este campo debe contener numero y letras' }),

        ],
         phone: [
          validations.optional(),
          validations.phoneNumber({ message: 'El número de teléfono no es válido' }),
          validations.minLength({ min: 5, message: 'Este campo debe tener al menos 5 caracteres' }),
          validations.maxLength({ max: 50, message: 'Este campo debe tener menos de 10 caracteres' }),
          //validations.alphanumeric({  message: 'Este campo debe contener numero y letras' }),

        ]
      })

      console.log(syncValidation, "sinc validation")
      console.log("asasd")
      if (Object.keys(syncValidation).length) return false


      const client = new Client({ nickname: inputs.nickname })

      //  console.log(client)
      const asyncValidation = await validate({
        nickname: [
          validations.customAsync({
            message: "Este cliente ya existe",
            callback: async (value) => {
              console.log(value)
              const result = await client.exists()

              return !result
            }
          })


        ]
      })
      console.log(asyncValidation, "async")


      if (Object.keys(asyncValidation).length) return false




      await nextStep()


    })
    return () => {

    }
  }, [inputs])


  return (

    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-10 text-center"> Informacion Contacto </h2>


      <div className='flex gap-2 flex-col w-full justify-center items-center mt-3'>

        <div className='w-2/3'>

          <Label>Email</Label>
          <div className="relative">
            <Input


              placeholder="info@gmail.com"
              type="text"
              className=""

               error={errors.email || false}
            value={inputs.email || ''}
            onChange={(e) => {
              /*   console.log(e.target.value)
                console.log(inputs) */
              dispatch(changeValue({ key: 'email', value: e.target.value }))
            }}
            />
           {/*  <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6" />
            </span> */}

            {
            errors.email ? (
              <span className='text-red-600'>{errors.email} </span>
            ) : ""
          }
          </div>

          {
            errors.nickname ? (
              <span className='text-red-600'>{errors.email} </span>
            ) : ""
          }
        </div>
        <div className='w-2/3'>

          <Label>Numero telefono
          </Label>
          <Input
            type='text'
            placeholder={"1111 111111"}
            error={errors.phone || false}
            value={inputs.phone || ''}
            onChange={(e) => {
              /*   console.log(e.target.value)
                console.log(inputs) */
              dispatch(changeValue({ key: 'phone', value: e.target.value }))
            }}
          />

          {
            errors.phone ? (
              <span className='text-red-600'>{errors.phone} </span>
            ) : ""
          }
        </div>



      </div>

    </div>

  )
}


export default Step3
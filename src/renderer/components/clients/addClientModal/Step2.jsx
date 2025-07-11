



import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setInputs, resetForm, changeValue } from '../../../redux/slices/formSlice';
import { useWizzar } from '../../FormWizzard';
import Input from '../../../form/input/InputField';
import Label from '../../../form/Label';
import useValidation from '../../../hooks/useValidator';
import Client from '../../../services/local/Client';






const Step2 = ({ step }) => {


  const { currentStep, disableNext, registerOnNext, setIsLoading, isLoading, nextStep } = useWizzar()
  const { validate, validations, errors } = useValidation()
  const { inputs } = useSelector(state => state.form)
  const dispatch = useDispatch()



  useEffect(() => {


    registerOnNext(async () => {

      const syncValidation = await validate({
        name: [
          validations.optional(),
          validations.alpha({  message: 'Este campo debe caracteres alfabeticos' }),

          //validations.minLength({ min: 5, message: 'Este campo debe tener al menos 2 caracteres' }),
          validations.maxLength({ max: 50, message: 'Este campo debe tener menos de 50 caracteres' }),
          //validations.alphanumeric({  message: 'Este campo debe contener numero y letras' }),

        ],
        lastname: [
          validations.optional(),
          validations.alpha({  message: 'Este campo debe caracteres alfabeticos' }),

          //validations.minLength({ min: 5, message: 'Este campo debe tener al menos 2 caracteres' }),
          validations.maxLength({ max: 50, message: 'Este campo debe tener menos de 50 caracteres' }),
          //validations.alphanumeric({  message: 'Este campo debe contener numero y letras' }),

        ],
        houseNumber: [
          validations.optional(),
          validations.numeric({  message: 'Este campo debe caracteres numerico' }),

          //validations.minLength({ min: 5, message: 'Este campo debe tener al menos 2 caracteres' }),
          validations.maxLength({ max: 50, message: 'Este campo debe tener menos de 50 caracteres' }),
          //validations.alphanumeric({  message: 'Este campo debe contener numero y letras' }),

        ],
        houseStreet: [
          validations.optional(),
          validations.streeName({  message: 'Este campo debe tener solo espacios y letras' }),

          //validations.minLength({ min: 5, message: 'Este campo debe tener al menos 2 caracteres' }),
          validations.maxLength({ max: 50, message: 'Este campo debe tener menos de 50 caracteres' }),
          //validations.alphanumeric({  message: 'Este campo debe contener numero y letras' }),

        ],
        
      })

      
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


  return (<div className="mb-6">
    <h2 className="text-xl font-semibold mb-10 text-center"> Informacion basica </h2>

   
    <div className='flex gap-2 w-full mb-10'>

      <div className='w-1/2'>

        <Label>Nombre
        </Label>
        <Input type='text'
          error={errors.name || false}
          value={inputs.name || ''}
          onChange={(e) => {
            /*   console.log(e.target.value)
              console.log(inputs) */
            dispatch(changeValue({ key: 'name', value: e.target.value }))
          }}
          placeholder={"nombre del cliente"}></Input>

        {
          errors.name ? (
            <span className='text-red-600'>{errors.name} </span>
          ) : ""
        }
      </div>

      <div className='w-1/2'>

        <Label>Apelido
        </Label>
        <Input type='text'
          error={errors.lastname || false}
          value={inputs.lastname || ''}
          onChange={(e) => {
            /*   console.log(e.target.value)
              console.log(inputs) */
            dispatch(changeValue({ key: 'lastname', value: e.target.value }))
          }}
          placeholder={"apellido del cliente"}></Input>

        {
          errors.houseStreet ? (
            <span className='text-red-600'>{errors.lastname} </span>
          ) : ""
        }
      </div>

    </div>

        
<div className='flex gap-2'>

        <div className='w-2/3'>
          <div>
            <Label>Calle

            </Label>
            <Input type='text'
              error={errors.houseStreet || false}
              value={inputs.houseStreet || ''}
              onChange={(e) => {
                /*   console.log(e.target.value)
                  console.log(inputs) */
                dispatch(changeValue({ key: 'houseStreet', value: e.target.value }))
              }}
              placeholder={"calle del domicilio"}></Input>
          </div>

          {
            errors.nickname ? (
              <span className='text-red-600'>{errors.houseStreet} </span>
            ) : ""
          }
        </div>
        <div className='w-1/3'>
          <div>
            <Label>numero de domicilio

            </Label>
            <Input type='number'
              error={errors.houseNumber || false}
              value={inputs.houseNumber || ''}
              onChange={(e) => {
                /*   console.log(e.target.value)
                  console.log(inputs) */
                dispatch(changeValue({ key: 'houseNumber', value: e.target.value }))
              }}
              placeholder={"numero del dmocilio"}></Input>
          </div>

          {
            errors.houseNumber ? (
              <span className='text-red-600'>{errors.houseNumber} </span>
            ) : ""
          }
        </div>
      </div>

  </div>
  )
}







export default Step2







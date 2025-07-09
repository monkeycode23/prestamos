

import React, { useEffect } from 'react'

import { useSelector, useDispatch } from "react-redux";
import { setInputs, resetForm, changeValue } from '../../../redux/slices/formSlice';
import { useWizzar } from '../../FormWizzard';
import Input from '../../../form/input/InputField';
import Label from '../../../form/Label';
import useValidation from '../../../hooks/useValidator';
import Client from '../../../services/local/Client';


const Step1 = ({ step }) => {

    const { currentStep, disableNext, registerOnNext, setIsLoading, isLoading, nextStep } = useWizzar()
    const { validate, validations, errors } = useValidation()
    const { inputs } = useSelector(state => state.form)
    const dispatch = useDispatch()



    useEffect(() => {


        registerOnNext(async () => {

            const syncValidation = await validate({
                nickname: [
                    validations.required({ message: "Este campo es requerido" }),
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

    if (currentStep != step) return

    return (


        <div className='flex flex-col justify-center items-center w-full mb-10'>
            <h2 className="text-xl font-semibold mb-10 text-center"> Coloca el nickname del cliente </h2>

            <div className='w-2/3'>

                <Label>Nickname
                    <span className='text-red-500'>*</span>
                </Label>
                <Input type='text'

                    error={errors.nickname || false}
                    value={inputs.nickname || ''}
                    onChange={(e) => {
                        /*   console.log(e.target.value)
                          console.log(inputs) */
                        dispatch(changeValue({ key: 'nickname', value: e.target.value }))
                    }}
                    placeholder={"ingrega el nickname"}></Input>


                {
                    errors.nickname ? (
                        <span className='text-red-600'>{errors.nickname} </span>
                    ) : ""
                }
            </div>



        </div>)
}


export default Step1
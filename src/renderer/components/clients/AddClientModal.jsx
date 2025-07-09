

import React, { useEffect } from 'react'
import { Modal } from '../ui/modal'
import { useModal } from '../../hooks/useModal'
import { closeModal } from '../../redux/slices/modalSlice'
import { useSelector, useDispatch } from "react-redux";
import FormWizard from '../FormWizzard';
import { setInputs, resetForm, changeValue } from '../../redux/slices/formSlice';
import FormWizardProvider from '../FormWizzard';
import { useWizzar } from '../FormWizzard';
import Input from '../../form/input/InputField';
import Label from '../../form/Label';
import useValidation from '../../hooks/useValidator';
import PhoneInput from '../../form/group-input/PhoneInput';
import Client from '../../services/local/Client';
import { SendHorizonal as EnvelopeIcon } from 'lucide-react';


import Step1 from './addClientModal/Step1'
import Step2 from './addClientModal/Step2';
import Step3 from './addClientModal/Step3';
import Step4 from './addClientModal/Step4';



export default function AddClientModal() {

  const form = useSelector(state => state.form)
  const dispatch = useDispatch()

  useEffect(() => {
    if (form.formName != "ADD_CLIENT") {
      dispatch(resetForm({
        formName: "ADD_CLIENT"
      }))

      dispatch(setInputs({
        nickname: "",
        name: "",
        lastname: "",
        email: "",
        houseNumber:"",
        houseNumber: "",
        phone: "",
        gender: "",

      }))
    }
  }, [])

  return (

    <Modal
      title="Agregar Cliente"
      className="max-w-[700px] p-6 lg:p-10"
    >
      <FormWizardProvider>

        <Step1></Step1>
        <Step2></Step2>
        <Step3></Step3>
        <Step4></Step4>
      </FormWizardProvider>
    </Modal>
  )
}









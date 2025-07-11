import { useState } from "react";
import { setInputs } from "../redux/slices/formSlice";
import { useSelector } from "react-redux";

const useValidation = () => {
  const [errors, setErrors] = useState({});
  const inputs = useSelector((state) => state.form.inputs);
 // const [isOptional, setIsOptional] = useState(false);
  // Definición de validaciones
  const validations = {
    optional:()=>{
       
      return (value) => {
       return "optional"
      }
    },
    checked: (params) => (value) =>
      value ? "" : params?.message || "Debes marcar esta casilla",

    required: (params) => (value) =>{
      
     // console.log(value,"deasdasdasd",value>0,typeof value)
      if(typeof value == 'number') {
       // console.log("asdihaskdjasdkjaskasjd")
        return value > 0 ? "" : params?.message || "Este campo es requerido" 
      }
      return value?.length > 0 ? "" : params?.message || "Este campo es requerido" 
    }
      
    
    ,

    email: (params) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (value) =>
        regex.test(value)
          ? ""
          : params.message || "El email no es válido";
    },
    alphanumeric: (params) => {
      const regex = /^[a-zA-Z0-9]+$/;   
        return (value) =>   
            regex.test(value)
                ? ""    
                : params.message || "Este campo solo puede contener letras y números";
    },
    alpha: (params) => {
      const regex = /^[a-zA-Z]+$/;   
        return (value) =>   
            regex.test(value)
                ? ""    
                : params.message || "Este campo solo puede contener letras";
    },

    numeric: (params) => {
      const regex = /^[0-9]+$/;
      return (value) =>
        regex.test(value)
          ? ""
          : params.message || "Este campo solo puede contener números";
    },
    streeName: (params) => {
      const regex = /^[a-zA-Z\s]+$/; // Permite solo letras y espacios
      return (value) =>
        regex.test(value)
          ? ""    
          : params.message || "Este campo solo puede contener letras y espacios";
    },
    phoneNumber: (params) => {
      const regex = /^\d{2,4}\s\d{6,8}$/; // Permite números con un prefijo opcional y entre 7 y 15 dígitos
      return (value) =>      
        regex.test(value)
          ? ""  
          : params.message || "El número de teléfono no es válido";
    },

    matchValues: (params) => {
    
      return (value) =>      
        params.match.includes(value)
          ? ""  
          : params.message || "No es un valor validado ";
    },  
    
    numericBetween: (params) => {
     
        return value < params.min && value > params.max
          ? params.message ||   "Este campo debe estar entre " + params.min + " y " + params.max
          : "";

    },  

     minValue: (params) => (value) =>
      value >= params.value
        ? ""
        : params.message ||
          `Este campo no debe ser menor a ${params.value} `,
     maxValue: (params) => (value) =>
      value <= params.value
        ? ""
        : params.message ||
          `Este campo no debe ser mayor a ${params.value} `,

    minLength: (params) => (value) =>
      value?.length >= params.min
        ? ""
        : params.message ||
          `Este campo debe tener al menos ${params.min} caracteres`,

    maxLength: (params) => (value) =>
      value?.length <= params.max
        ? ""
        : params.message ||
          `Este campo debe tener menos de ${params.max} caracteres`,

    custom: (params) => (value) =>
      params.callback(value)
        ? ""
        : params.message || "Este campo no es válido",

    customAsync: (params) => async (value) => {
      const isValid = await params.callback(value);
      console.log(isValid)
      return isValid ? "" : params.message || "Este campo no es válido";
    },

    checkPasswordStrength(params) {

      return (value) =>{

      const matchCases = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

      const matchNumbers = /^(?=.*[0-9]).+$/;

      const matchSpecialChars = /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
      if(!matchCases.test(value)) {
                console.log(value);

        return "La contraseña debe contener al menos una mayúscula y una minúscula.";
      }
      if(!matchNumbers.test(value)) {
                console.log(value,"asdasd");

        return "La contraseña debe contener al menos un número.";
      }
      if(!matchSpecialChars.test(value)) {
        return "La contraseña debe contener al menos un carácter especial.";
      }
      //return params.message || "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.";
      return matchCases && matchNumbers && matchSpecialChars ? "" : " una mayúscula, una minúscula, un número y un carácter especial.";
        
      }
 },
  match: (params) => {
    return value == params.matchValue
      ? ""  : params.message || "Los valores no coinciden";
  },
  };

  // validacionesConfig: { campo: [funciones] }
  const validate = async (validationsConfig) => {
    const newErrors = {};

    for (const key in validationsConfig) {
      if (validationsConfig[key]) {

        for (const validation of validationsConfig[key]) {
          try {
            let result;
            /* console.log(inputs)
            console.log(inputs[key]) */
            // Verificar si es función async
          //  console.log("key",key,"value",inputs[key])
            const validationResult = validation(inputs[key]);

            const isOptional = validationResult === "optional"

            console.log(validationResult,inputs[key], "inputs[key]",key)
            if(isOptional && inputs[key]=="") break 
            else if(isOptional && inputs[key]!="") continue
            
            
            if (validationResult instanceof Promise) {
              result = await validationResult;
            } else {
              result = validationResult;
            }
            
            //console.log(isOptional, "isOptional")
            if (result) {
              newErrors[key] = result;
              break; // Rompe si hay error
            }
          } catch (error) {
            console.error(`Error in validation for ${key}:`, error);
            newErrors[key] = error.message || "Error en la validación";
            break;
          }
        }

       // if(isOptional) setIsOptional(false)
      }
    }

    setErrors(newErrors);
    return newErrors;
  };

  return {
    errors,
    setErrors,
    validate,
    inputs,
    setInputs,
    validations,
  };
};

export default useValidation;

import { useState } from "react";

export const handleOnChange = ({e, form, setForm}) => {
   const {name, value} = e.target;

   console.log(`${name}: ${value}`);
   setForm({
    ...form,
    [name]: value,
   });    
};


export const useForm = (initialState) => {
  const [form, setForm] = useState(initialState)

  return {
    form,
    setForm,
    handleOnChange: (e) => handleOnChange({e,form,setForm}),
  };
};
import { useState } from "react";

export const useForm = (initialValue={}) => {
  const [formValue, setFormValue] = useState(initialValue)

  const handleChangeInput = ({target})=>{
    setFormValue({
        ...formValue,
        [target.name ] : target.value
        })
    }  
    const reset = (newFormState = initialValue)=>{
        setFormValue(newFormState)
    }
   

    return[ 
        formValue,
        handleChangeInput,
        reset       
    ]
}
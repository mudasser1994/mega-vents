import { Label, Select } from 'semantic-ui-react';
import { useField } from 'formik';
import { FormField } from 'semantic-ui-react';






import React from 'react'
 
export const MySelectInput = ({label , ...props}) => {
    const [field , meta, helpers] = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <label >{label}</label>
           <Select value={field.value} 
                   clearable 
                   onBlur={()=>helpers.setTouched(true)} 
                   onChange={(e , d)=>{ helpers.setValue(d.value) }}
                   {...props} />
            {meta.touched && meta.error && <Label basic color="red" >{meta.error}</Label> }
        </FormField>
    )
}

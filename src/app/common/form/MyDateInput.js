import { Label } from 'semantic-ui-react';
import { useField, useFormikContext } from 'formik';
import { FormField } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import React from 'react'
import "react-datepicker/dist/react-datepicker.css";

export const MyDateInput = ({label , ...props}) => {
    const {setFieldValue} = useFormikContext();
    const [field , meta, helpers] = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <label >{label}</label>
           <DatePicker 
                   {...field}
                   {...props}
                   selected={ field.value && new Date(field.value) || null} 
                   onChange={value=>setFieldValue(field.name , value)}
                   />
            {meta.touched && meta.error && <Label basic color="red" >{meta.error}</Label> }
        </FormField>
    )
}

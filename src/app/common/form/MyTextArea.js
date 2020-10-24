import { Label } from 'semantic-ui-react';
import { FormField } from 'semantic-ui-react';
import React from "react";
import { useField } from "formik";

const MyTextArea = ({label , ...props})=>{
   const [field , meta] = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <label >{label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error && <Label basic color="red" >{meta.error}</Label> }
        </FormField>
    )
}

export default MyTextArea;
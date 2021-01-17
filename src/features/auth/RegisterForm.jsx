import React from 'react'
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import MyTextInput from '../../app/common/form/MyTextInput';
import {  Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import {  registerUserInFirebase } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

 const RegisterForm = () => {
     const dispatch = useDispatch();
    return (
        <ModalWrapper size="mini" header="Register to Re-vents">
           {<Formik
             validationSchema={Yup.object({
                 displayName: Yup.string().required(),
                 email: Yup.string().required().email(),
                 password: Yup.string().required()
             })}
             initialValues={{
               displayName:"",
               email: "",
               password: ""
             }}
             onSubmit={async ( values , {setSubmitting , setErrors})=>{
                 try {
                   await registerUserInFirebase(values); 
                   setSubmitting(false);
                   dispatch(closeModal());
                 }
                 catch(error){
                    setSubmitting(false);
                    setErrors({
                        auth: error.message
                    })
                 }
             }}>
             {
                 ({isSubmitting , isValid , dirty , errors})=>(
                     <Form className="ui form">
                         <MyTextInput name="displayName" placeholder="Display Name" />
                         <MyTextInput name="email" placeholder="Email Address" />
                         <MyTextInput name="password" type="password" placeholder="Password" />
                         {errors.auth && <Label basic color="red" style={{marginBottom: 10}}  content={"Problem with username or password"}  />}
                         { /* auth.error */ }
                         <Divider horizontal>Or</Divider>
                         <SocialLogin />
                         <Button loading={isSubmitting}
                                  disabled={!isValid || !dirty || isSubmitting}
                                  type="submit" 
                                  fluid
                                  size="large"
                                  content="Register"
                                  color="teal" />
                     </Form>
                 )
             }
  
            </Formik>}
        </ModalWrapper>
    )
}

export default RegisterForm ;
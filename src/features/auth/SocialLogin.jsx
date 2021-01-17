import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { closeModal } from "../../app/common/modals/modalReducer";
import {socialLogin} from "../../app/firestore/firebaseService";

export default function SocialLogin(){
    const dispatch = useDispatch();

    function handleSocialLogin(provider){
        dispatch(closeModal());
        socialLogin(provider);
    }

    return (
        <>
        <Button onClick={()=>handleSocialLogin("facebook")} type="button" icon="facebook" fluid color="facebook" style={{marginBottom: "10px"}}
        content="Login with Facebook" />
         <Button onClick={()=>handleSocialLogin("google")} type="button" icon="google" fluid color="google plus" style={{marginBottom: "10px"}}
        content="Login with Google" />
        </>
    )
}
import React, {Component, useState} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useRef } from 'react';
 

export default function PhotoWidgetCropper({setImage , imagePreview}) {
    const cropperRef = useRef(null);
    function cropImage() {
        if(cropperRef.current && cropperRef.current.cropper){
            cropperRef.current.cropper.getCroppedCanvas().toBlob(blob=>{
                       setImage(blob);
            } , "image/jpeg");
        }
    }
 
    // function onCropperInit(cropper) {
    //     this.cropper = cropper;
    // }
 
        return (
            <Cropper
                src={imagePreview}
                style={{height: 200, width: '100%'}}
                // Cropper.js options
                aspectRatio={1}
                guides={false}
                crop={cropImage}
                preview=".img-preview"
                viewMode={1}
                dragMode="move"
                scalable={true}
                cropBoxMovable={true}
                // cropBoxResizable={true}
                // onInitialized={onCropperInit.bind(this)}
                ref={cropperRef}
            />
        );
}
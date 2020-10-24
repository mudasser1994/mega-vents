


import React, { useState } from "react";
import { Segment, Header, Button, FormField, Label } from "semantic-ui-react";
import cuid from "cuid";
import { useSelector, useDispatch } from "react-redux";
import {addEvent as  createEvent   , updateEvent} from "../eventActions";
import { Formik , Form , Field, ErrorMessage } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from "yup";
import MyTextArea from "../../../app/common/form/MyTextArea";
import {categoryData} from "../../../app/api/categoryOptions";
import { MySelectInput } from "../../../app/common/form/MySelectInput";
import { MyDateInput } from "../../../app/common/form/MyDateInput";

const EventForm = ({match , history})=>{

    const dispatch = useDispatch();
    const selectedEvent =  useSelector(state => state.event.events.find(ev=>ev.id===match.params.id));
    const initialValues = selectedEvent ? selectedEvent : {
        title:'',
        category:'',
        description:'',
        city:'',
        venue:'',
        date:''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("You must provide a title"),
        category: Yup.string().required("You must provide a category"),
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        date: Yup.string().required()
    })
    // const [values , setValues] = useState(initialValues);
    

    // const handleInputChange = (event)=>{
        
    //     const {name , value} = event.target;
    //     setValues({
    //         ...values,
    //         [name]: value
    //     })
    // }

    return (
    <Segment clearing>
     
        <Formik initialValues={initialValues} 
                validationSchema={validationSchema}
                onSubmit={(values)=>{
                    selectedEvent ? 
                    dispatch(updateEvent({...selectedEvent ,  ...values})) :
                    dispatch(createEvent({...values , id:cuid() , hostedBy:"Bob" , attendees:[] ,  hostPhotoURL: '/assets/user.png'}));
                    history.push("/events");
                }}> 
                {
                    ({isSubmitting, dirty , isValid})=>( <Form className="ui form">
                    <Header sub color="teal" content="Event Details"   />
                    <MyTextInput label="Event Title"  name="title" placeholder="Event Title" />
                    <MySelectInput options={categoryData} label="Category"   name="category" placeholder="Category" />
                    <MyTextArea label="Description"  name="description" rows={3} placeholder="Description" />
                    <Header sub color="teal" content="Event Location Details"   />
                    <MyTextInput label="City"  name="city" placeholder="City" />
                    <MyTextInput label="Venue"  name="venue" placeholder="Venue" />
                    <MyDateInput label="Date" name="date" 
                                 placeholderText="Event Date"
                                 timeFormat="HH:mm"
                                 showTimeSelect
                                 timeCaption="time"
                                 dateFormat="MMMM d, yyyy h:mm a" />
                    {/* <FormField>
                        <Field  name="title" placeholder="Event Title"/>
                        <ErrorMessage name='title' render={(error)=><Label basic color="red" content={error} /> } /> 
                    </FormField> */}
    
                   
                    <Button loading={isSubmitting} disabled={!isValid || !dirty || isSubmitting} type="submit" floated="right" positive content="Submit" />
                    <Button type="button" disabled={isSubmitting} onClick={()=>{history.push("/")}} floated="right"  content="Cancel" />
                </Form> )
                }            
        </Formik>


    </Segment>
    )
}


export default EventForm;
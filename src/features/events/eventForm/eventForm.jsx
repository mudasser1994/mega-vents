/* global google */
import React, {  useState } from "react";
import {Redirect} from "react-router-dom";
import { Segment, Header, Button , Confirm } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { listenToEvents} from "../eventActions";
import { Formik , Form  } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from "yup";
import MyTextArea from "../../../app/common/form/MyTextArea";
import {categoryData} from "../../../app/api/categoryOptions";
import { MySelectInput } from "../../../app/common/form/MySelectInput";
import { MyDateInput } from "../../../app/common/form/MyDateInput";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import { useFirestoreDoc } from "../../../app/hooks/useFirestoreDoc";
import { listenToEventFromFirestore, addEventToFirestore , updateEventInFirestore , cancelEventToggle } from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";


const EventForm = ({match , history})=>{

    const dispatch = useDispatch();
    const [loadingCancel , setLoadingCancel ] = useState(false);
    const [confirmOpen , setConfirmOpen ] = useState(false);
    const selectedEvent = useSelector(state => state.event.events.find(ev=>ev.id===match.params.id));
    const { loading , error } = useSelector(state=>state.async);
    const initialValues = selectedEvent ? selectedEvent : {
        title:'',
        category:'',
        description:'',
        city:{
            address: "",
            latLng: null
        },
        venue:{
            address: "",
            latLng: null
        },
        date:''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("You must provide a title"),
        category: Yup.string().required("You must provide a category"),
        description: Yup.string().required(),
        city: Yup.object().shape({
            address: Yup.string().required("City is required")
        }),
        venue: Yup.object().shape({
            address: Yup.string().required("Venue is required")
        }),
        date: Yup.string().required()
    })




    useFirestoreDoc({
        shouldExecute: !!match.params.id,
        query: ()=>listenToEventFromFirestore(match.params.id),
        data: event=> dispatch(listenToEvents([event])),
        deps: [match.params.id , dispatch]
    })

    async function handleToggleEvent(event){
        setConfirmOpen(false);
        setLoadingCancel(true);
        try {
            await cancelEventToggle(event);
            setLoadingCancel(false);
        }
        catch(error){
            setLoadingCancel(false);
            toast.error(error.message);
        }
    }
    // const [values , setValues] = useState(initialValues);
    

    // const handleInputChange = (event)=>{
        
    //     const {name , value} = event.target;
    //     setValues({
    //         ...values,
    //         [name]: value
    //     })
    // }

    if(loading) {
        return <LoadingComponent content="Loading Event..." />
    }

    if(error){
        return <Redirect to="/error" />
    }

    return (
    <Segment clearing>
     
        <Formik initialValues={initialValues} 
                validationSchema={validationSchema}
                enableReinitialize 
                onSubmit={async (values , {setSubmitting})=>{
                    setSubmitting(true);
                    try {
                        selectedEvent ? await updateEventInFirestore(values) : await addEventToFirestore(values);
                        // dispatch(createEvent({...values , id:cuid() , hostedBy:"Bob" , attendees:[] ,  hostPhotoURL: '/assets/user.png'}));
                        history.push("/events");                   
                    }
                    catch(error){
                        toast.error(error);
                        setSubmitting(false);
                    }
                   
                }}> 
                {
                    ({isSubmitting, dirty , isValid , values})=>( <Form className="ui form">
                    <Header sub color="teal" content="Event Details"   />
                    <MyTextInput label="Event Title"  name="title" placeholder="Event Title" />
                    <MySelectInput options={categoryData} label="Category"   name="category" placeholder="Category" />
                    <MyTextArea label="Description"  name="description" rows={3} placeholder="Description" />
                    <Header sub color="teal" content="Event Location Details"   />
                    <MyPlaceInput label="City"  name="city" placeholder="City" /> 
                    <MyPlaceInput  label="Venue"  name="venue" placeholder="Venue" 
                     disabled={!values.city.latLng}
                     options={{
                         location: new google.maps.LatLng(values.city.latLng),
                         radius:1000,
                         type: ['establishment']
                     }} /> 
                    {/* <MyTextInput label="City"  name="city" placeholder="City" /> */}
                    {/* <MyTextInput label="Venue"  name="venue" placeholder="Venue" /> */}
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

                    {selectedEvent &&  <Button  
                        type="button"
                        loading={loadingCancel} 
                        color={selectedEvent.isCancelled ? 'green' : 'red' } 
                        floated="left" 
                        content={selectedEvent.isCancelled ? "Reactivate Event" : "Cancel Event"}
                        onClick={()=>setConfirmOpen(true)}
                         /> }
                    <Button loading={isSubmitting} disabled={!isValid || !dirty || isSubmitting} type="submit" floated="right" positive content="Submit" />
                    <Button type="button" disabled={isSubmitting} onClick={()=>{history.push("/")}} floated="right"  content="Cancel" />
                </Form> )
                }            
        </Formik>
        <Confirm
        content={selectedEvent?.isCancelled ? "This will reactivate the event - are you sure?"
        : "This will cancel the event - are you sure?"}
        open={confirmOpen}
        onCancel={()=>setConfirmOpen(false)}
        onConfirm={()=>handleToggleEvent(selectedEvent) } >

        </Confirm>


    </Segment>
    )
}


export default EventForm;



import React, { useState } from "react";
import { Segment, Header, Form, Button } from "semantic-ui-react";
import cuid from "cuid";
import { useSelector, useDispatch } from "react-redux";
import {addEvent as  createEvent   , updateEvent} from "../eventActions";

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
    const [values , setValues] = useState(initialValues);
    
    const handleFormSubmit = ()=>{
        if(selectedEvent){
            dispatch(updateEvent({...selectedEvent ,  ...values}));
        }
        else {
             dispatch(createEvent({...values , id:cuid() , hostedBy:"Bob" , attendees:[] ,  hostPhotoURL: '/assets/user.png',}));
        }
        history.push("/events");
        
    }

    const handleInputChange = (event)=>{
        
        const {name , value} = event.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
    <Segment clearing>
        <Header content={selectedEvent ? "Edit the event"  : "Create new event" }   />
        <Form onSubmit={handleFormSubmit}>
            <Form.Field>
                <input type="text" name="title" value={values.title} onChange={handleInputChange} placeholder="Enter Event"/>
            </Form.Field>
            <Form.Field>
                <input type="text"  name="category" value={values.category} onChange={handleInputChange} placeholder="Category"/>
            </Form.Field>
            <Form.Field>
                <input type="text"  name="description" value={values.description} onChange={handleInputChange} placeholder="Description"/>
            </Form.Field>
            <Form.Field>
                <input type="text" name="city" value={values.city} onChange={handleInputChange} placeholder="City"/>
            </Form.Field>
            <Form.Field>
                <input type="text" name="venue" value={values.venue} onChange={handleInputChange} placeholder="Venue"/>
            </Form.Field>
            <Form.Field>
                <input type="date" name="date" value={values.date} onChange={handleInputChange} placeholder="Date"/>
            </Form.Field>
            <Button type="submit" floated="right" positive content="Submit" />
            <Button onClick={()=>{}} type="submit" floated="right"  content="Cancel" />
        </Form>

    </Segment>
    )
}


export default EventForm;
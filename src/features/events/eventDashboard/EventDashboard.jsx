import React, {useState} from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./eventList/EventList";
import {sampleData} from "../../../app/api/sampleData";

const EventDashboard = ()=>{
    const [events , setEvents] = useState(sampleData);

    // const handleCreateEvent = (event)=>{
    //     setEvents([
    //         ...events , 
    //         event
    //     ]);
    // }

    // const handleUpdateEvent = (updatedEvent)=>{
    //     setEvents(events.map(event=>updatedEvent.id===event.id ? updatedEvent : event));
    // }

    const handleDeleteEvent = (eventId)=>{
        setEvents(events.filter(event=>event.id!==eventId));
    }


    return (
        <React.Fragment>
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events}  deleteEvent={handleDeleteEvent} />
            </Grid.Column>
            <Grid.Column width={6}>
            <h2>Event Filters</h2>
            </Grid.Column>
        </Grid>
        </React.Fragment>
    )
}


export default EventDashboard;
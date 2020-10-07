import React, {useState} from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./eventList/EventList";
import EventForm from "../eventForm/eventForm";
import {sampleData} from "../../../app/api/sampleData";

const EventDashboard = ({formOpen , setFormOpen})=>{
    const [events , setEvents] = useState(sampleData);

    const handleCreateEvent = (event)=>{
        setEvents([
            ...events , 
            event
        ]);
    }
    return (
        <React.Fragment>
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events} />
            </Grid.Column>
            <Grid.Column width={6}>
            {formOpen && <EventForm createEvent={handleCreateEvent} setFormOpen={setFormOpen} setEvents={setEvents} /> }
            </Grid.Column>
        </Grid>
        </React.Fragment>
    )
}


export default EventDashboard;
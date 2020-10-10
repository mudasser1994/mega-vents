import React from "react";
import EventListItem from "../eventListItem/EventListItem";


const EventList = ({events , selectEvent  , deleteEvent})=>{
    return (
        <>
        { events.map(event=><EventListItem deleteEvent={deleteEvent}  selectEvent={selectEvent} event={event} key={event.id} />) }
        </>
    )
}


export default EventList;
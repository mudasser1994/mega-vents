import React from 'react'
import { Grid } from 'semantic-ui-react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';

 const EventDetailedPage = () => {
    const params= useParams();
    const event =  useSelector(state => state.event.events.find(ev=>ev.id===params.id));
      return (  <Grid>
            <Grid.Column width={10}>
               <EventDetailedHeader event={event} />
               <EventDetailedInfo event={event} />
               <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar attendees={event.attendees} />
            </Grid.Column>
        </Grid>
    )
}

export default EventDetailedPage;




import React from 'react'
import { Grid } from 'semantic-ui-react';
import {useParams , Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import { listenToEvents } from '../eventActions';
import EventDetailedSidebar from './EventDetailedSidebar';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useDispatch } from 'react-redux';

 const EventDetailedPage = () => {
    
    const dispatch = useDispatch(); 
    const params= useParams();

    const event =  useSelector(state => state.event.events.find(ev=>ev.id===params.id));
    const { loading , error } = useSelector(state=>state.async)
    console.log(loading , error);
    useFirestoreDoc({
        query: ()=>listenToEventFromFirestore(params.id),
        data: event=> dispatch(listenToEvents([event])),
        deps: [params.id , dispatch]
    })

    if(loading || (!event && !error)) {
        return <LoadingComponent content="Loading Event..." />
    }

    if(error){
        return <Redirect to="/error" />
    }

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

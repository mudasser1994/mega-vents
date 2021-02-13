import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import {useParams , Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import { listenToSelectedEvent } from '../eventActions';
import EventDetailedSidebar from './EventDetailedSidebar';
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useDispatch } from 'react-redux';

 const EventDetailedPage = () => {
    
    const dispatch = useDispatch(); 
    const params= useParams();

    const event =  useSelector(state => state.event.selectedEvent);
    const { loading , error } = useSelector(state=>state.async)
    const {currentUser} = useSelector(state=>state.auth);
    const isHost = event?.hostUid === currentUser?.uid;
    const isGoing = event?.attendees?.some(a=>a.id==currentUser?.uid);

    useFirestoreDoc({
        query: ()=>listenToEventFromFirestore(params.id),
        data: event=> dispatch(listenToSelectedEvent(event)),
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
               <EventDetailedHeader isGoing={isGoing} isHost={isHost} event={event} />
               <EventDetailedInfo event={event} />
               <EventDetailedChat eventId={event.id} />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar  attendees={event.attendees} hostUid={event.hostUid} />
            </Grid.Column>
        </Grid>
    )
}

export default EventDetailedPage;

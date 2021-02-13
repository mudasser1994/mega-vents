import React, { useEffect } from 'react';
import {useSelector} from "react-redux";
import {  Grid, Loader } from "semantic-ui-react";
import EventList from "./eventList/EventList";
import EventFilters from "./eventFilters/EventFilters";
import EventListItemPlaceholder from "./eventListItemPlaceholder/EventListItemPlaceholder";
import { fetchEvents } from '../eventActions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import EventFeed from './eventFeed/eventFeed';
import { RETAIN_STATE } from '../eventConstants';

const EventDashboard = ()=>{
    // const [events , setEvents] = useState(sampleData);
    const limit = 2;
    const {events , moreEvents , lastVisible, filter , startDate, retainState} = useSelector(state=>state.event);
    const {loading} = useSelector(state=>state.async);
    const { authenticated } = useSelector(state=>state.auth);
    const [loadingInitial , setLoadingInitial] = useState(null);

    const dispatch = useDispatch();

    // useFirestoreCollection({
    //     query: ()=>listenToEventsFromFirestore(predicate),
    //     data: events=>dispatch(listenToEvents(events)),
    //     deps: [dispatch , predicate]
    // })

    useEffect(()=>{
        if(retainState) return;
        setLoadingInitial(true);
        dispatch(fetchEvents(filter , startDate , limit)).then(()=>{
            setLoadingInitial(false);
        });
        return ()=>dispatch({
            type: RETAIN_STATE
        })
    } , [filter , startDate , retainState , dispatch])

    function handleFetchNextEvents(){
        dispatch(fetchEvents(filter , startDate , limit , lastVisible));
    }


    // useEffect(()=>{
    //     dispatch(asyncActionStart());
    //     const unsubscribe = listenToEventsFromFirestore({
    //         next: snapshot=>{
    //             dispatch(listenToEvents(snapshot.docs.map(docSnapshot=> { return dataFromSnapshot(docSnapshot) })));
    //             dispatch(asyncActionFinish());
    //         },
    //         error: error=>dispatch(asyncActionError(error)),
    //         complete: ()=>console.log("You are never going to see this")
    //     });
    //     return unsubscribe;

    // } , [dispatch])

    return (
        <React.Fragment>
        <Grid>
            <Grid.Column width={10}>
                {
                    loadingInitial && <>
                      <EventListItemPlaceholder />
                      <EventListItemPlaceholder />
                    </>
                }
                <EventList events={events} 
                 getNextEvents={handleFetchNextEvents}
                 loading={loading}
                 moreEvents={moreEvents}  
                 />
            </Grid.Column>
            <Grid.Column width={6}>
                {authenticated && <EventFeed /> }
              <EventFilters loading={loading} />
            </Grid.Column>
            <Grid.Column width={10}>
               <Loader active={loading} />
            </Grid.Column>
        </Grid>
        </React.Fragment>
    )
}


export default EventDashboard;
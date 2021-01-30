import React, { useEffect } from 'react';
import {useSelector} from "react-redux";
import {  Grid, Loader } from "semantic-ui-react";
import EventList from "./eventList/EventList";
import EventFilters from "./eventFilters/EventFilters";
import EventListItemPlaceholder from "./eventListItemPlaceholder/EventListItemPlaceholder";
import { clearEvents, fetchEvents } from '../eventActions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import EventFeed from './eventFeed/eventFeed';

const EventDashboard = ()=>{
    // const [events , setEvents] = useState(sampleData);
    const limit = 2;
    const {events , moreEvents} = useSelector(state=>state.event);
    const {loading} = useSelector(state=>state.async);
    const { authenticated } = useSelector(state=>state.auth);
    const [loadingInitial , setLoadingInitial] = useState(null);
    const [predicate , setPredicate] = useState(new Map([
        ['startDate' , new Date(new Date().setHours(0,0,0,0))],
        ['filter' , 'all']
    ]))
    const [lastDocSnapshot , setLastDocSnapshot] = useState(null);

    const dispatch = useDispatch();

    // useFirestoreCollection({
    //     query: ()=>listenToEventsFromFirestore(predicate),
    //     data: events=>dispatch(listenToEvents(events)),
    //     deps: [dispatch , predicate]
    // })

    useEffect(()=>{
        setLoadingInitial(true);
        dispatch(fetchEvents(predicate , limit)).then((lastVisible)=>{
            setLastDocSnapshot(lastVisible);
            setLoadingInitial(false);
        });
        return ()=>dispatch(clearEvents()) 
    } , [predicate , dispatch])

    function handleFetchNextEvents(){
        dispatch(fetchEvents(predicate , limit , lastDocSnapshot)).then((lastVisible)=>{
            setLastDocSnapshot(lastVisible);
        });
    }

    function handleSetPredicate(key , value){
        dispatch(clearEvents());
        setLastDocSnapshot(null);
        setPredicate(new Map(predicate.set(key , value)));
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
              <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading} />
            </Grid.Column>
            <Grid.Column width={10}>
               <Loader active={loading} />
            </Grid.Column>
        </Grid>
        </React.Fragment>
    )
}


export default EventDashboard;
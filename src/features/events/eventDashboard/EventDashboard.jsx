import React from 'react';
import {useSelector} from "react-redux";
import { Grid } from "semantic-ui-react";
import EventList from "./eventList/EventList";
import EventFilters from "./eventFilters/EventFilters";
import EventListItemPlaceholder from "./eventListItemPlaceholder/EventListItemPlaceholder";
import { listenToEventsFromFirestore  } from "../../../app/firestore/firestoreService";
import { listenToEvents } from '../eventActions';
import { useDispatch } from 'react-redux';
import { useFirestoreCollection } from '../../../app/hooks/useFirestoreCollection';

const EventDashboard = ()=>{
    // const [events , setEvents] = useState(sampleData);
    const {events} = useSelector(state=>state.event);
    const {loading} = useSelector(state=>state.async);
    const dispatch = useDispatch();

    useFirestoreCollection({
        query: listenToEventsFromFirestore,
        data: events=>dispatch(listenToEvents(events)),
        deps: [dispatch]
    })

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
                    loading && <>
                      <EventListItemPlaceholder />
                      <EventListItemPlaceholder />
                    </>
                }
                <EventList events={events}  />
            </Grid.Column>
            <Grid.Column width={6}>
              <EventFilters />
            </Grid.Column>
        </Grid>
        </React.Fragment>
    )
}


export default EventDashboard;
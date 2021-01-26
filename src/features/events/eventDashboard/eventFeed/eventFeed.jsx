import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feed, Header, Segment } from "semantic-ui-react";
import { firebaseObjectToArray, getUserFeedRef } from "../../../../app/firestore/firebaseService";
import { listenToFeed } from "../../../profiles/store/profileActions";
import EventFeeditem from "../eventFeedItem/eventFeedItem";

export default function EventFeed(){
    const dispatch = useDispatch();
    const {feed} = useSelector(state=>state.profile);
    
    useEffect(()=>{
        getUserFeedRef().on("value" , snapshot=>{
            if(!snapshot.exists()) return;
            const feed = firebaseObjectToArray(snapshot.val()).reverse()
            dispatch(listenToFeed(feed))
        })
        return ()=>getUserFeedRef().off();
    } , [dispatch])

    return (
        <>
           <Header attached color="teal" icon="newspaper" content="News feed"></Header>
           <Segment attached="bottom">
               <Feed>
                   { feed.map(post=>(
                       <EventFeeditem key={post.id} post={post} />
                   )) }
               </Feed>
            </Segment>
        </>
    )
}
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import { getUserProfile } from "../../app/firestore/firestoreService";
import { listenToSelectedUserProfile } from "./store/profileActions";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function ProfilePage({match}){
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state=>state.auth);
    const {selectedUserProfile , currentUserProfile} = useSelector(state=>state.profile);
    const {loading, error} = useSelector(state=>state.async);
    let profile;

    useFirestoreDoc({
        query: ()=>getUserProfile(match.params.id),
        data: (profile)=>dispatch(listenToSelectedUserProfile(profile)),
    deps: [match.params.id , dispatch],
        shouldExecute: match.params.id !== currentUser.uid
    })

    if(match.params.id === currentUser.uid){
        profile = currentUserProfile
    }
    else {
        profile = selectedUserProfile
    }

    if((loading && !profile) || (!profile && !error)) { return <LoadingComponent content="Loading Profile..." /> }
    return (
        <Grid>
              <Grid.Column width={16}>
                  <ProfileHeader isCurrentUser={currentUser.uid === profile.id} profile={profile} />
                  <ProfileContent  isCurrentUser={currentUser.uid === profile.id} profile={profile} />
              </Grid.Column>
        </Grid>
    )
}
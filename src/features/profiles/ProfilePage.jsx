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
    const {selectedUserProfile} = useSelector(state=>state.profile);
    const {loading, error} = useSelector(state=>state.async);

    useFirestoreDoc({
        query: ()=>getUserProfile(match.params.id),
        data: (profile)=>dispatch(listenToSelectedUserProfile(profile)),
        deps: [match.params.id , dispatch]
    })

    if((loading && !selectedUserProfile) || (!selectedUserProfile && !error)) { return <LoadingComponent content="Loading Profile..." /> }
    return (
        <Grid>
              <Grid.Column width={16}>
                  <ProfileHeader isCurrentUser={currentUser.uid==selectedUserProfile.id} profile={selectedUserProfile} />
                  <ProfileContent  isCurrentUser={currentUser.uid==selectedUserProfile.id} profile={selectedUserProfile} />
              </Grid.Column>
        </Grid>
    )
}
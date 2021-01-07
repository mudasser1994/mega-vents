

import React from 'react'
import { Segment , Icon } from 'semantic-ui-react';
import GoogleMapReact from "google-map-react";

function Marker(){
    return (<Icon name="marker" size="big" color="red" ></Icon>)
}


 const EventDetailedMap = ({latLng}) => {
     const zoom = 14;
    return (
        <Segment attached="bottom" style={{padding:0}}>
           <div style={{
               height: 300,
               width: '100%'
           }}>
             <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAwaOV2_PoJCLS8lW9wfjSm9ojqk4hIOZM" }}
                center={latLng}
                zoom={zoom}>
                  <Marker lat={latLng.lat} lng={latLng.lng} />
             </GoogleMapReact>
           </div>
        </Segment>
    )
}


export default EventDetailedMap;

import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, google} from 'google-maps-react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { observable, action } from 'mobx'

   
export class MapContainer {
  // @observable containerStyle
  // @observable center
  @observable locations = [{ lat: 32.1827965, lng: 34.8513687, name: "sos"}]
  // @observable googleMapsApiKey

  constructor() {
    // this.containerStyle = {
    //     width: '400px',
    //     height: '400px'
    //   }
    // this.center = {
    //     lat: 32.1827965,
    //     lng: 34.8513687 
    //   }
    // this.googleMapsApiKey="AIzaSyCm8cj9dRisI1LeIqulbg68R8gHxcm2Q0M"
    // this.map = <GoogleMap mapContainerStyle={this.containerStyle} center={this.center} zoom={13}></GoogleMap>

  }
  
  @action addSosLocationToMap = (location, name) => {
    this.locations.push({lat: location.coords.latitude, lng: location.coords.longitude, name})
  }

    displayMarkers = () => {
      return this.locations.map((location, index) => {
        return <Marker key={index} id={index} position={{
         lat: location.lat,
         lng: location.lng
       }}
       onClick={() => console.log(location.name)} />
      })
    }
  
}

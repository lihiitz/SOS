import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, google} from 'google-maps-react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { observable, action } from 'mobx'
import Axios from 'axios';

   
export class MapContainer {
  @observable containerStyle
  @observable center
  // @observable markers = [{lat: 32.1827965, lng: 34.8513687, name: "sos"}, {lat: 32.179798, lng: 34.839996, name: "sos"}]
  @observable markers = []

  constructor() {
    this.containerStyle = {
        width: '400px',
        height: '400px'
      }
    this.center = {
        lat: 32.1827965,
        lng: 34.8513687 
      }
    // this.googleMapsApiKey="AIzaSyCm8cj9dRisI1LeIqulbg68R8gHxcm2Q0M"

  }

  @action getMarkers = async () => {
    // debugger
    let markers = await Axios.get('http://localhost:3001/markers')
    markers.data.forEach(element => {
      element.forEach(m => this.markers.push(m))
    })
    console.log(this.markers)
  }

    displayMarkers = () => {
      // debugger
      console.log(this.markers);
      
      return this.markers.map((marker, index) => {
        return <Marker key={index} id={index} position={{
         lat: marker.lat,
         lng: marker.lng
       }}
       onClick={() => console.log(marker.name)} />
      })
    }
  
}

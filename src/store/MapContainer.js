import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper, google } from 'google-maps-react';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api'
import { observable, action } from 'mobx'
import Axios from 'axios';


export class MapContainer {
  @observable containerStyle
  @observable center
  @observable markers = [] //{lat: number, lng: number, color: str}
  @observable zones = []

  constructor() {
    this.containerStyle = {
      width: '400px',
      height: '400px'
    }
    this.center = {
      lat: 31.880099,
      lng: 34.820535
    }
    this.zones = [
      {
        name: 'a',
        color: '',
        lat: 32.066385,
        lng: 34.775957
      },
      {
        name: 'b',
        color: '',
        lat: 32.989208,
        lng: 35.455084
      }
    ]
    this.radius = 100 //km

  }

  @action handleSos = async (location, name) => {
    const marker = await Axios.post(`http://localhost:3001/marker/`, { lat: location.latitude, lng: location.longitude, name })
  }

//   @action addCircles = () => {
//     for (let zone in this.zones) {
//       // Add the circle for this city to the map.
//       const circle = new google.maps.Circle({
//         strokeColor: "#FF0000",
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: "#FF0000",
//         fillOpacity: 0.35,
//         center: {lat: zone.lat, lng: zone.lng},
//         radius: 100
//       })
//   }
// }

  @action getColor = (point) => {
    for (let z of this.zones){
      if (this.isPointInCircle(point, z)){
        return z.color
      }
    }
  }

  @action getMarkers = async () => {
    debugger
    let markers = await Axios.get('http://localhost:3001/markers')
    // let markers = await Axios.get('/markers')
    let temp = markers.data.map(m => {
      return(
        {lat: m.lat, lng: m.lng}
      )
    })
    this.markers = temp

    this.addColorToZones()

    temp = this.markers.map(m => {
      const color = this.getColor(m)
      return(
        {lat: m.lat, lng: m.lng, color}
      )
    })
    this.markers = temp

    console.log(this.markers)
  }

  @action addColorToZones = () => {
    this.zones.forEach(z => {
      let count = this.countMarkersInZone(z)
      if (count > 10){
        z.color = 'red'
      }else if (count <= 10 && count > 5){
        z.color = 'purple'
      }else{
        z.color = 'yellow'
      }
    })
  }

  @action countMarkersInZone = (zone) => {
    let counter = 0
    this.markers.forEach(m => {
      if (this.isPointInCircle(m, zone)){
        counter ++
      }
    })
    return counter
  }

  @action isPointInCircle = (point, circleCenter) => {
    let dist_points = (point.lat - circleCenter.lat) * (point.lat - circleCenter.lat) + (point.lng - circleCenter.lng) * (point.lng - circleCenter.lng)
    let r = this.radius * this.radius
    if (dist_points < r) {
        return true
    }
    return false
  }

  // displayMarkers = () => {
  //   let url = "http://maps.google.com/mapfiles/ms/icons/"
  //   return this.markers.map((marker, index) => {
  //     url += marker.color + "-dot.png"
  //     return <Marker key={index} id={index} position={{
  //       lat: marker.lat,
  //       lng: marker.lng
  //     }}
  //       onClick={() => console.log(marker.name)}
  //       // options={{icon:`${url}`}}
  //       />
  //   })
  // }

  displayMarkers = () => {
    let url = "http://maps.google.com/mapfiles/ms/icons/"
    return this.markers.map((marker, index) => {
      url += marker.color + "-dot.png"
      return <Marker key={index} id={index} position={{
        lat: marker.lat,
        lng: marker.lng
      }}
        onClick={() => console.log(marker.name)}
        // options={{icon:`${url}`}}
        />
    })
  }
}

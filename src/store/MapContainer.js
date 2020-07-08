
import { Map, InfoWindow, Marker, GoogleApiWrapper, google } from 'google-maps-react';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api'
import { observable, action } from 'mobx'
import Axios from 'axios';
import React, { Component } from 'react';
import { render } from 'react-dom';


export class MapContainer {
  @observable containerStyle
  @observable center
  @observable markers = [] //{lat: number, lng: number, color: string}
  @observable zones = []
  
  constructor(){
    this.center = {
      lat: 31.880099,
      lng: 34.820535
    }
    this.zones = [
      {
        count: 0,
        color: '',
        lat: 29.563468, //eilat
        lng: 34.923842,
        circle: {
          radius: 0,
          options: {
            strokeColor: ""
          }
        }
      },
      {
        count: 0,
        color: '',
        lat: 32.072741,
        lng: 34.771058, //tel aviv
        circle: {
          radius: 0,
          options: {
            strokeColor: "",
            strokeOpacity: 0.8,
            fillColor: "",
            fillOpacity: 0.35,

          }
        }
      },
      {
        count: 0,
        color: '',
        lat: 33.275325,//metula
        lng: 35.578519,
        circle: {
          radius: 0,
          options: {
            strokeColor: ""
          }
        }
      }
    ]
    this.radius = 2000//in metersssssssssss
    this.zoom = 12
  }

  @action handleSos = async (location, name) => {
    const d = new Date()
    // const date = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate(), hours: d.getHours(), minutes: d.getMinutes() }
    const timeStamp = Date.now()
    const marker = await Axios.post(`/api/marker/`, { lat: location.latitude, lng: location.longitude, timeStamp, name })
  }

  @action getColor = (point) => {
    for (let z of this.zones){
      if (this.isPointInCircle(point, z)){
        return z.color
      }
    }
  }

  @action isNewMarker = (date) => {
    const now = new Date()


  }

  @action getMarkers = async () => {
    let markers = await Axios.get('/api/markers')
    // this.markers = markers.data
    this.markers = markers.data.map(m => {
      let ms = Date.now() - m.timeStamp
      // debugger
      const isNew = ms < 3600000 ? true: false
      return(
        {
          id: m._id,
          name: m.name,
          lat: m.lat,
          lng: m.lng,
          new: isNew
        }
      )
    })
    

    this.addColorToZones()

    let temp = this.zones.map(z => {
      return(
        Object.assign(z, {circle: {
          radius: this.radius,
          options: {
            strokeColor: z.color,
            strokeOpacity: 0.8,
            fillColor: z.color,
            fillOpacity: 0.35,
          }
        }})
      )
    })
    this.zones = temp
    console.log(this.markers)
  }

  @action addColorToZones = () => {

    this.zones.forEach(z => {
      let count = this.countMarkersInZone(z)
      z.count = count
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
    let dist_points = this.distance(point.lat, point.lng, circleCenter.lat, circleCenter.lng, "K") //dist in Kilometers
    if (dist_points < this.radius) {
        return true
    }
    return false
  }

  @action distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist * 1000; //return in meters
    }
  }
}

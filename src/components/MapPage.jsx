import React from 'react'
import Topic from './Topic'
import MapContainer from './MapContainer';

function MapPage() {
  return (
    <div>
      <Topic />
      <MapContainer containerElement={<div style={{ height: `710px` }} />}
    mapElement={<div style={{ height: `100%` }} />}loadingElement={<div style={{ height: `100%` }} />} googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCm8cj9dRisI1LeIqulbg68R8gHxcm2Q0M"/>
    </div>
  )
}

export default MapPage

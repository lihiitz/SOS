// import React from 'react'
// import { inject, observer } from 'mobx-react'
// import { LoadScript, GoogleMap } from '@react-google-maps/api'

// const SOSMap = inject("mapStore")(observer((props) => {

//   const containerStyle = {
//     width: '400px',
//     height: '400px'
//   }

//   const center = {
//     lat: 32.1827965,
//     lng: 34.8513687 
//   }

//   const map = <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}></GoogleMap>

//   const addSosLocationToMap = () => {
//     const infoWindow = new GoogleMap.InfoWindow()
//     const marker = new GoogleMap.Marker({
//       position: new GoogleMap.LatLng(32.1827965, 34.8513687),
//       map: this.map
//     })
//     GoogleMap.event.addListener(marker, 'click', (function(marker){
//       return function(){
//         infoWindow.setContent("sos")
//         infoWindow.open(this.map, marker)
//       }
//     })(marker))
//   }
// addSosLocationToMap()
//   return (
 
//     <LoadScript
//       googleMapsApiKey="AIzaSyCm8cj9dRisI1LeIqulbg68R8gHxcm2Q0M"
//     >
//       {/* {props.mapStore.map} */}
//       {map}

//     </LoadScript>
//   )
// }))


// export default SOSMap
import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { inject, observer } from 'mobx-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

@observer
@inject('userStore', 'mapStore')
class MapContainer extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.mapStore);
    
  }

  // displayMarkers = () => {
  //   return this.state.stores.map((store, index) => {
  //     return <Marker key={index} id={index} position={{
  //      lat: store.latitude,
  //      lng: store.longitude
  //    }}
  //    onClick={() => console.log(this.props.userStore.location)} />
  //   })
  // }

  render() {
    return (
        <Map
          google={this.props.google}
          zoom={13}
          style={mapStyles}
          initialCenter={{ lat: 32.1827965, lng: 34.8513687}}
        >
          
          {this.props.mapStore.displayMarkers()}
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCm8cj9dRisI1LeIqulbg68R8gHxcm2Q0M'
})(MapContainer)
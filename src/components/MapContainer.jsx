import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { inject, observer } from 'mobx-react';

@observer
@inject('userStore', 'mapStore')
class MapContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    const fetchData = async () => {
      await this.props.mapStore.getMarkers()
      await this.setState({
        // markers: this.props.mapStore.markers
      })
    }
    fetchData()
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={this.props.mapStore.mapStyles}
        initialCenter={{ lat: this.props.mapStore.center.lat, lng: this.props.mapStore.center.lng }}
      >
        {this.props.mapStore.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCm8cj9dRisI1LeIqulbg68R8gHxcm2Q0M'
})(MapContainer)
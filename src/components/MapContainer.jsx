import React, {Fragment, Component} from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Circle
} from "react-google-maps";
import { observer, inject } from "mobx-react";

@inject('userStore', 'mapStore')
@observer
 class MapContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    const fetchData = async () => {
      await this.props.mapStore.getMarkers()
    }
    fetchData()
  }

  render(){
    return (
      <GoogleMap
        defaultZoom={this.props.mapStore.zoom}
        defaultCenter={{
                    lat: this.props.userStore.location ? 
                    this.props.userStore.location.latitude : 
                    this.props.mapStore.center.lat, 
                    lng: this.props.userStore.location ? 
                    this.props.userStore.location.longitude : 
                    this.props.mapStore.center.lng }}
      >
        {this.props.mapStore.markers.map(place => {
          return (
            <Fragment key={place._id}>
              <Marker
                position={{
                  lat: parseFloat(place.lat),
                  lng: parseFloat(place.lng)
                }}
                onClick={() => console.log(place)}
              />
            </Fragment>
          )
        })}
        {this.props.mapStore.zones.map(zone => {  
          return(
            <Circle
              defaultCenter={{
                lat: parseFloat(zone.lat),
                lng: parseFloat(zone.lng)
              }}
              radius={zone.count > 0 ? this.props.mapStore.radius : 0}
              options={zone.circle.options}
            />
          )
        })}
      </GoogleMap>
    )
  }
}
export default withScriptjs(withGoogleMap(MapContainer));

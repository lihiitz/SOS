import { observable, action } from 'mobx'
import io from 'socket.io-client'


// import { GoogleMap, LoadScript } from '@react-google-maps/api'

export class Socket {

  @observable socket
  @observable user
  @observable map

  constructor(user, map) {
    this.socket = null
    this.user = user
    this.map = map
  }

  @action connectSocket () {
    this.socket = io.connect('http://localhost:3001')
    this.socket.on('refresh', () => {
      console.log("in socket refresh");
      this.map.getMarkers()
    })
    this.socket.on('timer', () => {
        console.log("in socket timer");
        
    })
  }
}
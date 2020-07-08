import React from 'react'
import { inject, observer } from 'mobx-react'
import '../styles/RedButton.css'

const RedButton = inject('userStore', 'mapStore', 'socketStore')(observer((props) => {
  const sendSos = ()=> {
    props.userStore.handleSos()
    props.mapStore.handleSos(props.userStore.location, "sos", props.socketStore.socket)    
  }
  return (
    <div className="body">
    <div id="sos123" className='SOS' onClick={sendSos}>
      SOS
    </div>
    </div>

  )
}))

export default RedButton

import React from 'react'
import { inject, observer } from 'mobx-react'
import '../styles/RedButton.css'

const RedButton = inject('userStore', 'mapStore')(observer((props) => {
  const sendSos = ()=> {
    props.userStore.handleSos()
    props.mapStore.handleSos(props.userStore.location, "sos")    
    alert("SOS")
  }
  return (
    <div className="body">
    <div className='SOS' onClick={sendSos}>
      SOS
    </div>
    </div>

  )
}))

export default RedButton

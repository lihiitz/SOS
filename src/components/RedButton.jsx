import React from 'react'
import { inject, observer } from 'mobx-react'
import '../styles/RedButton.css'

const RedButton = inject('userStore', 'mapStore')(observer((props) => {
  const sendSos = ()=> {
    props.userStore.handleSos()
    // props.mapStore.addSosLocationToMap(props.userStore.location, "sos")
    alert("SOS")
  }
  return (
    <div className='SOS' onClick={sendSos}>

    </div>
  )
}))

export default RedButton

import React from 'react'
import { inject, observer } from 'mobx-react'
// import '.../styles/RedButton.css'

const RedButton = inject("userStore")(observer((props) => {
  const sendSos = ()=> {
    props.userStore.handleSos()
    alert("SOS")
  }
  return (
    <div className='SOS' onClick={sendSos}>

    </div>
  )
}))

export default RedButton

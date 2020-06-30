import React from 'react'
import { inject, observer } from 'mobx-react'
import './RedButton.css'

const RedButton = inject("userStore")(observer((props) => {
  const sendSos = ()=> {
    alert("SOS")
  }
  return (
    <div className='SOS' onClick={sendSos}>

    </div>
  )
}))

export default RedButton

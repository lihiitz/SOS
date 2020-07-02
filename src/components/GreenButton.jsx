import React from 'react'
import './GreenButton.css'
import { inject, observer } from 'mobx-react'

const GreenButton = inject("userStore")(observer((props) => {
  const hours = props.hours
  const greenSignal = () => {
    props.userStore.greenSignal(hours)
  }

   const startCount = () => {
     props.startCount(hours)
   }
  return (
    <div className='green' onClick={startCount}>
    
    </div>
  )
}))

export default GreenButton

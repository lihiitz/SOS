import React, { useState } from 'react'
import '../../styles/GreenButton.css'
import { inject, observer } from 'mobx-react'
import CountDown from './CountDown';
// import '../styles/GreenButton.css'

const GreenButton = inject("userStore")(observer((props) => {

  const [textButton, setTextButton] = useState({
    start: "START",
    isStart: true
  })


  const startCount = async () => {
    let textButtonVal = { ...textButton }
    textButtonVal.isStart = !textButtonVal.isStart
    textButtonVal.start = textButtonVal.start === "START" ? "STOP" : "START"
    await setTextButton(textButtonVal)
    if (textButton.isStart) {
      props.userStore.greenSignal(props.hours)
    } else {
      props.userStore.stopTimer()
    }
  }

  return (
    <div>
      <div className='green' onClick={startCount}>
        {textButton.start}
      </div>
      {props.userStore.timer.isOn ? <CountDown time={props.userStore.timer} /> : null}
    </div>

  )
}))

export default GreenButton

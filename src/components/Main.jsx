import React from 'react'
import { useState } from 'react'
import { inject, observer } from 'mobx-react'
import RedButton from './RedButton';
import Topic from './Topic'

const Main = inject("userStore")(observer((props) => {
  const user = props.userStore
  const makeCall = () => {
    props.userStore.makeCall()
  }
  debugger
  return (
    <div>
      <Topic />
      <RedButton />
      <div onClick={props.userStore.makeCall}>TRY CALL</div>
    </div>
  )
}))


export default Main
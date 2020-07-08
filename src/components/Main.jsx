import React from 'react'
import { inject, observer } from 'mobx-react'
import RedButton from './RedButton';
import Topic from './Topic'


const Main = inject("userStore")(observer( (props) => {

  return (
    <div>
      <Topic />
      <RedButton />
      <div onClick={props.userStore.makeCall}>TRY CALL</div>
    </div>
  )
}))


export default Main
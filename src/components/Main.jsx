import React from 'react'
import { inject, observer } from 'mobx-react'
import RedButton from './RedButton';
import Topic from './Topic'
import { getSubscription } from '../notifications/notifications-web-push';

const Main = inject("userStore")(observer( (props) => {

  const subscribtion =  getSubscription().then( console.log)

  return (
    <div>
      <Topic />
      <RedButton />
      <div onClick={props.userStore.makeCall}>TRY CALL</div>
    </div>
  )
}))


export default Main
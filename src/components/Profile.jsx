import React from 'react'
import { useState } from 'react'
import { inject, observer } from 'mobx-react'

const Profile = inject("userStore")(observer((props) => {
  const user = props.userStore
  return (
    <div>

    </div>
  )
}))


export default Profile
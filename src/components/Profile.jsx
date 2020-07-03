import React, { forwardRef, useImperativeHandle } from 'react';
import { useState } from 'react'
import { inject, observer } from 'mobx-react'
import Topic from './Topic'
import Button from '@material-ui/core/Button';
import { TextField, makeStyles } from '@material-ui/core';

const stylesheet = makeStyles({
  row: {
    display: 'flex',
    flexDirection: 'column'
  },
});

const Profile = inject("userStore")(observer((props, ref) => {
  const thisuser = props.userStore

  const [user, setUser] = React.useState({
    name: '',
    phone: '',
    password: ''
  });
  const [id, setId] = React.useState(null)
  const [show, setShow] = React.useState(false)

  const handleInput = e => {
    let userVal = { ...user }
    userVal[e.target.name] = e.target.value
    setUser(userVal)
  }
  const editProfile = () => {
    const name = user.name
    const phone = user.phone
    const password = user.password
    localStorage.setItem(`phone`, `${phone}`);
    localStorage.setItem(`password`, `${password}`);
    props.userStore.updateUser(name, phone, password)
  }

  const classes = stylesheet();
  return (
    <div>
      <Topic />

      <form noValidate autoComplete="off" className={classes.row}>
        Name: <TextField label={thisuser.name} name='name' value={user.name} onChange={handleInput} />
        Phone: <TextField label={thisuser.phone} name='phone' value={user.phone} onChange={handleInput} />
        Password: <TextField type="password" label={thisuser.password} name='password' value={user.password} onChange={handleInput} />
        <Button variant="contained" color="primary" disableElevation onClick={editProfile}>Edit profile</Button>
        {/* <Button variant="contained" color="red" disableElevation onClick = {notEdit}>Cancel</Button> */}
      </form>

    </div>
  )
}))


export default Profile
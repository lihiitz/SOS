import React from 'react';
import { useState } from 'react'
import { inject, observer } from 'mobx-react'
import Topic from './Topic'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Profile = inject("userStore")(observer((props, ref) => {
  const classes = useStyles();

  const thisuser = props.userStore

  const [user, setUser] = React.useState({
    name: thisuser.name,
    phone: thisuser.phone,
    password: thisuser.password
  });

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

  return (
    <div>
      <Topic />
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
        <Input
          id="input-with-icon-adornment"
          name='name'
          value={user.name}
          onChange={handleInput}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">Phone</InputLabel>
        <Input
          id="input-with-icon-adornment"
          name='phone'
          value={user.phone}
          onChange={handleInput}
          startAdornment={
            <InputAdornment position="start">
              <PhoneIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
        <Input
          id="input-with-icon-adornment"
          type='password'
          name='password'
          value={user.password}
          onChange={handleInput}
          startAdornment={
            <InputAdornment position="start">
              <VpnKeyIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Button variant="contained" color="primary" disableElevation onClick={editProfile}>Edit profile</Button>
      {/* <form noValidate autoComplete="off" className={classes.row}>
        Name: <TextField label={thisuser.name} name='name' value={user.name} onChange={handleInput} />
        Phone: <TextField label={thisuser.phone} name='phone' value={user.phone} onChange={handleInput} />
        Password: <TextField type="password" label={thisuser.password} name='password' value={user.password} onChange={handleInput} />
      </form> */}

    </div>
  )
}))


export default Profile

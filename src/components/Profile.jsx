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
import "./Profile.scss"


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
    <div className="profileBody">
      <Topic />
      <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: "block" }}>
      <div className="textbox">
      <FormControl  id="profileText" className={classes.margin}>
        <InputLabel id="profileText" htmlFor="input-with-icon-adornment"></InputLabel>
        <AccountCircle id="123" className="profileIcon"/>
        <input
          placeholder="  Name"
          id="profileText"
          name='name'
          value={user.name}
          onChange={handleInput}
        />
      </FormControl>
      </div>
      </div>
      <br></br>
      <div className="textbox">
      <FormControl className={classes.margin}>
        <InputLabel id="profileText" htmlFor="input-with-icon-adornment"></InputLabel>
        <PhoneIcon className="profileIcon"/>
        <input
          placeholder="  Phone"
          id="profileText"
          name='phone'
          value={user.phone}
          onChange={handleInput}
          startAdornment={
            <InputAdornment position="start">
              <PhoneIcon className="profileIcon"/>
            </InputAdornment>
          }
        />
      </FormControl>
      </div>
      <br></br>
      <div className="textbox">
      <FormControl className={classes.margin}>
        <InputLabel id="profileText" htmlFor="input-with-icon-adornment"></InputLabel>
        <VpnKeyIcon className="profileIcon"/>
        <input
          placeholder="  Password"
          id="profileText"
          type='password'
          name='password'
          value={user.password}
          onChange={handleInput}
          startAdornment={
            <InputAdornment position="start">
              <VpnKeyIcon className="profileIcon"/>
            </InputAdornment>
          }
        />
      </FormControl>
      </div>
      <br></br>
      <br></br>
      <button className="loginBtn" disableElevation onClick={editProfile}>Edit profile</button>

    </div>
   </div>
  )
}))


export default Profile

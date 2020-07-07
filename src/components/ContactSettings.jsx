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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const ContactSettings = inject("userStore")(observer((props, ref) => {
  const classes = useStyles();

  // eslint-disable-next-line no-restricted-globals
  const name = history.state.state.contactName
  // eslint-disable-next-line no-restricted-globals
  const phone = history.state.state.contactPhone

  const [contact, setContact] = React.useState({
    contactName: name,
    contactPhone: phone,
  });

  const handleInput = e => {
    let userVal = { ...contact }
    userVal[e.target.name] = e.target.value
    setContact(userVal)
  }
  const updateContact = () => {
    props.userStore.updateContact(name, contact.contactName, contact.contactPhone)
  }
  const deleteContact = () => {
    props.userStore.deleteContact(name, phone)
  }
  return (
    <div>
      <body>
      <Topic />
      <Link to='/contacts'> <ArrowBackIosIcon /> </Link>
      <div className="textbox">
        <FormControl className={classes.margin}>
          <input
            placeholder="Contact Name"
            id="input-with-icon-adornment"
            name='contactName'
            value={contact.contactName}
            onChange={handleInput}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        </div>
        <div className="textbox">
        <br></br>
        <FormControl className={classes.margin}>
          <input
            placeholder="Contact Phone"
            id="input-with-icon-adornment"
            name='contactPhone'
            value={contact.contactPhone}
            onChange={handleInput}
            startAdornment={
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        </div>

        <button className="loginBtn" variant="contained" color="primary" disableElevation onClick={updateContact}>Edit contact</button>

        <Link to='/contacts'> <button className="loginBtn" variant="contained" color="primary" disableElevation onClick={deleteContact}>Delete contact</button></Link>
        </body>
        </div>

  )
}))


export default ContactSettings

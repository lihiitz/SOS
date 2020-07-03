import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import validator from 'validator';
import { Formik } from "formik";
import * as EmailValidator from "email-validator"; // used when validating with a self-implemented approach
import * as Yup from "yup"; // used when validating with a pre-built solution

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const Registration = inject("userStore")(observer((props) => {
  const classes = useStyles();

  const [inputUser, setInputUser] = useState({
    name: "",
    phone: "",
    password: ""
  })

  const [inputContact, setInputContact] = useState({
    contactName: "",
    contactPhone: ""
  })


  const handleInputUser = e => {
    let inputVal = { ...inputUser }
    inputVal[e.target.name] = e.target.value
    setInputUser(inputVal)
  }

  const handleInputContact = e => {
    let inputVal = { ...inputContact }
    inputVal[e.target.name] = e.target.value
    setInputContact(inputVal)
  }

  const checking = () => {
    if (inputUser.name === "") {
        alert("Imput your name") 
        return false
    }
    if (inputUser.phone === "") {
      alert("Imput your phone")
      return false
    }
    if (!validator.contains(inputUser.phone, "+972")) {
      alert('input phone in format "+972..."')
      return false
    }
    if (!validator.contains(inputContact.contactPhone, "+972")) {
      alert('input phone in format "+972..."')
      return false
    }
    if (inputContact.contactName === "") {
      alert("Imput your contact name")
      return false
    } else {
      return true
    }
  }
  const registration = async () => {
    // 
    const isAllOk = checking()
    if (isAllOk) {
      const user = {
        name: inputUser.name,
        phone: inputUser.phone,
        password: inputUser.password,
      contacts: [{
        contactName: inputContact.contactName,
        contactPhone: inputContact.contactPhone
      }],
      timer: {isOn: false}
      }

      const newUser = await props.userStore.registration(user)
      if (newUser === false) {
        alert('we cant registrate u now, sorry')
      } else {
        localStorage.setItem(`phone`, `${user.phone}`);
        localStorage.setItem(`password`, `${user.password}`);
        props.login()
      }
    } else {
      return
    }
  }
  return (
    <div>
      <Link to='/'> <ArrowBackIosIcon /> </Link>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="name" label="Name" name='name' onChange={handleInputUser} />
        <TextField id="phone" label="Phone" name='phone' onChange={handleInputUser} />
        <TextField type='password' id="password" label="Password" name='password' onChange={handleInputUser} />
        <TextField id="contactName" label="Contact Name" name='contactName' onChange={handleInputContact} />
        <TextField id="contactPhone" label="Contact Phone" name='contactPhone' onChange={handleInputContact} />
        <Button variant="contained" color="primary" disableElevation onClick={registration} >Registration</Button>
        {props.isLoged ? <Redirect to='/main' /> : null}
      </form>
    </div>
  );
}))



export default Registration
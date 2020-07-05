import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import validator from 'validator';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  form: {
    width: '300px',
    display: 'grid',
    flexDirection: 'column',
    rowGap: theme.spacing(4) + 'px'
  }
}));


const Registration = inject("userStore")(observer((props) => {
  const classes = useStyles();

  const [inputUser, setInputUser] = useState({
    name: "",
    phone: "+972",
    password: ""
  })

  const [inputContact, setInputContact] = useState({
    contactName: "",
    contactPhone: "+972"
  })

  const [validation, setValidation] = useState({
    name: null,
    phone: null,
    password: null,
    contactName: null,
    contactPhone: null
  })

  const handleInputUser = e => {
    const inputVal = { ...inputUser }

    inputVal[e.target.name] = e.target.value

    setInputUser(inputVal)
    validateRequiredInput(e)
  }

  const handleContactInput = e => {
    const inputVal = { ...inputContact }
    inputVal[e.target.name] = e.target.value

    setInputContact(inputVal)
    validateRequiredInput(e)
  }

  const validateRequiredInput = e => {
    const state = { ...validation }
    const isInvalid = !e.target.value

    state[e.target.name] = isInvalid ? 'Required' : null

    setValidation(state)
  }


  const validatePassword = e => {
    const state = { ...validation }
    const isInvalid = e.target.value.length < 3

    state.password = isInvalid ? 'Has to contain more then 3 letters' : null

    setValidation(state)
  }

  const validatePhone = e => {
    const state = { ...validation }
    const isInvalid = !validator.contains(e.target.value, '+972') || e.target.value.length !== 13

    state.phone = isInvalid ? 'Phone must be in format +972...' : null

    setValidation(state)
  }

  const validateContactPhone = e => {
    const state = { ...validation }
    const isInvalid = !validator.contains(e.target.value, '+972') || e.target.value.length !== 13

    state.contactPhone = isInvalid ? 'Phone must be in format +972...' : null

    setValidation(state)
  }



  const hasNoErrors = Object.keys(validation).every(k => validation[k] === null)
  const isFormValid = hasNoErrors && Object.keys(inputUser).every(k => inputUser[k]?.length) && Object.keys(inputContact).every(k => inputContact[k]?.length)


  const registration = async () => {
    if (isFormValid) {
      const user = {
        name: inputUser.name,
        phone: inputUser.phone,
        password: inputUser.password,
        contacts: [{
          contactName: inputContact.contactName,
          contactPhone: inputContact.contactPhone
        }],
        timer: { isOn: false }
      }

      const newUser = await props.userStore.registration(user)
      if (newUser === false) {
        alert('we cant registrate u now, sorry')
      } else {
        localStorage.setItem(`phone`, `${user.phone}`);
        localStorage.setItem(`password`, `${user.password}`);
        props.login()
      }
    }
  }
  return (
    <div>
      <Link to='/'> <ArrowBackIosIcon /> </Link>
      <form className={classes.form} noValidate autoComplete="off">

        <TextField
          error={!!validation.name}
          value={inputUser.name}
          label="Name"
          name='name'
          onBlur={validateRequiredInput}
          onChange={handleInputUser}
          id="standard-error-helper-text"
          helperText={validation.name}></TextField>
        <TextField
          error={!!validation.phone}
          value={inputUser.phone}
          onBlur={validatePhone}
          label="Phone"
          name='phone'
          onChange={handleInputUser}
          id="standard-error-helper-text"
          helperText={validation.phone}
        />
        <TextField
          error={!!validation.password}
          value={inputUser.password}
          onBlur={validatePassword}
          type='password'
          label="Password"
          name='password'
          onChange={handleInputUser}
          id="standard-error-helper-text"
          helperText={validation.password}
        />
        <TextField
          error={!!validation.contactName}
          onBlur={validateRequiredInput}
          label="Contact Name"
          name='contactName'
          onChange={handleContactInput}
          id="standard-error-helper-text"
          helperText={validation.contactName}
        />

        <TextField
          error={!!validation.contactPhone}
          onBlur={validateContactPhone}
          value={inputContact.contactPhone}
          label="Contact Phone"
          name='contactPhone'
          onChange={handleContactInput}
          id="standard-error-helper-text"
          helperText={validation.contactPhone}
        />

        <Button variant="contained" color="primary" disabled={!isFormValid} disableElevation onClick={registration}>Registration</Button>

        {props.isLoged ? <Redirect to='/main' /> : null}
      </form>
    </div>
  );
}))



export default Registration
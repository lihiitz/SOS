import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel';
import { useState } from 'react'
import { inject, observer } from 'mobx-react'
import validator from 'validator';
import "./Contacts.scss"


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const AddNewContact = inject("userStore")(observer((props) => {
  const classes = useStyles();

  const [input, setInput] = useState({
    contactName: "",
    contactPhone: "+972",
  })
  const [validation, setValidation] = useState({
    contactName: null,
    contactPhone: null
  })


  const handleInput = e => {
    let inputVal = { ...input }
    inputVal[e.target.name] = e.target.value
    setInput(inputVal)
    validateRequiredInput(e)
  }

  const addNewContact = async () => {
    if (isFormValid) {
      await props.userStore.addNewContact(input.contactName, input.contactPhone)
    }

    let inputVal = { ...input }
    inputVal.contactName = ''
    inputVal.contactPhone = '+972'
    setInput(inputVal)
  }

  const validateRequiredInput = e => {
    const state = { ...validation }
    const isInvalid = !e.target.value

    state[e.target.name] = isInvalid ? 'Required' : null

    setValidation(state)
  }

  const validatePhone = e => {
    const state = { ...validation }
    const isInvalid = !validator.contains(e.target.value, '+972') || e.target.value.length !== 13
    state.contactPhone = isInvalid ? 'Phone must be in format +972...' : null
    setValidation(state)
  }

  const hasNoErrors = Object.keys(validation).every(k => validation[k] === null)
  const isFormValid = hasNoErrors && Object.keys(input).every(k => input[k]?.length)
  return (
    <div>
      <body>
      <div className="textbox">
        <input
          placeholder="Contact Name"
          id="ContactText"
          error={!!validation.contactName}
          name='contactName'
          value={input.contactName}
          onBlur={validateRequiredInput}
          onChange={handleInput}
          helperText={validation.contactName}/>
      </div>
      <div className="textbox">
        <input
          placeholder="Contact Number"
          error={!!validation.contactPhone}
          onBlur={validatePhone}
          name='contactPhone'
          value={input.contactPhone}
          onChange={handleInput}
          id="ContactText"
          helperText={validation.contactPhone}/>
        </div>
        <Button className="loginBtn"style={{backgroundColor:"#202020", color:'white', border:'solid #c0392b 1px', marginBottom:"15px"}} variant="contained" color="primary" disabled={!isFormValid} disableElevation onClick={addNewContact}>Add New Contact</Button>
        </body>
    </div>
  )
}))

export default AddNewContact


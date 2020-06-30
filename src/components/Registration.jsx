import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react'
import { inject, observer } from 'mobx-react'

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

  const registration = () => {
    const user = {
      name: inputUser.name,
      phone: inputUser.phone,
      password: inputUser.password,
      contact: {
        contactName: inputContact.contactName,
        contactPhone: inputContact.contactPhone
      }
    }
    const newUser = props.userStore.registration(user)
    if (newUser === false) {
      alert('we cant registrate u now, sorry')
    } else {
      props.login()
    }
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="name" label="Name" name='name' onChange={handleInputUser} />
      <TextField id="phone" label="Phone" name='phone' onChange={handleInputUser} />
      <TextField id="password" label="Password" name='password' onChange={handleInputUser} />
      <TextField id="contactName" label="Contact Name" name='contactName' onChange={handleInputContact} />
      <TextField id="contactPhone" label="Contact Name" name='contactPhone' onChange={handleInputContact} />

      <Button variant="contained" color="primary" disableElevation onClick={registration} >Registration</Button>
    </form>
  );
}))



export default Registration
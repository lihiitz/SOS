import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
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

const AddNewContact = inject("userStore")(observer((props) => {
  const classes = useStyles();

  const [input, setInput] = useState({
    name: "",
    phone: "",
  })

  const handleInput = e => {
    let inputVal = { ...input }
    inputVal[e.target.name] = e.target.value
    setInput(inputVal)
  }

  const addNewContact = () => {
    props.userStore.addNewContact(input.name, input.phone)
  }

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="name" label="Name" name='name' onChange={handleInput} />
        <TextField id="phone" label="Phone" name='phone' onChange={handleInput} />
        <Button variant="contained" color="primary" disableElevation onClick={addNewContact}>Add New Contact</Button>
      </form>
    </div>
  )
}))

export default AddNewContact


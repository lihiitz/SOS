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


const Login = inject("userStore")(observer((props) => {
  const classes = useStyles();

  const [input, setInput] = useState({
    phone: "",
    password: "",
  })



  const handleInput = e => {
    let inputVal = { ...input }
    inputVal[e.target.name] = e.target.value
    setInput(inputVal)
  }

  const login = () => {
    const result = props.userStore.login(input.phone, input.password)
    localStorage.setItem(`phone`, `${input.phone}`);
    localStorage.setItem(`password`, `${input.password}`);
    if (result === false) {
      alert('wrong password or phone')
    } else {
      props.login()
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="phone" label="Phone" name='phone' onChange={handleInput} />
      <TextField id="password" label="Password" name='password' onChange={handleInput} />
      <Button variant="contained" color="primary" disableElevation onClick={login}>LogIn</Button>
      {props.isLoged ? <Redirect to='/main' /> : null}
    </form>
  );
}))



export default Login
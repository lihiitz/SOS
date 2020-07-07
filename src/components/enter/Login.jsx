import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { useState } from 'react'
import { inject, observer } from 'mobx-react'
import "./login.css"

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
    phone: "+972",
    password: "",
  })

  const [validation, setValidation] = useState(true)

  const handleInput = e => {
    let inputVal = { ...input }
    inputVal[e.target.name] = e.target.value
    setInput(inputVal)
  }

  const login = async () => {
    const result = await props.userStore.login(input.phone, input.password)

    if (result === false) {
      setValidation(false)
    } else {
      props.login()
      localStorage.setItem(`phone`, `${input.phone}`);
      localStorage.setItem(`password`, `${input.password}`);
    }


  }

  return (
    <div>
      <body>
        <div className="login-box">
          <h1>Login</h1>
          <div className="textbox">
              <input id="phone" label="Phone" name='phone' placeholder="Phone" onChange={handleInput} />
          </div>
            <div className="textbox">
              <input id="password" label="Password" name='password' placeholder="Password" onChange={handleInput} type="password" />
            </div>
            <button className="loginBtn" variant="contained" color="primary" disableElevation onClick={login}>Logigit n</button>
            {props.isLoged ? <Redirect to='/main' /> : null}

        </div>
      </body>
    </div>

    // <div class="textbox">
    //   <i class="fas fa-user"></i>
    //   <input type="text" placeholder="Username">
    // </div>

    // <div class="textbox">
    //   <i class="fas fa-lock"></i>
    //   <input type="password" placeholder="Password">
    // </div>

    // <input type="button" class="btn" value="Sign in">

    // <form className={classes.root} noValidate autoComplete="on">
    //   {validation ? <TextField id="phone" label="Phone" name='phone' onChange={handleInput} /> : <TextField
    //     error
    //     id="standard-error-helper-text"
    //     label="Phone" 
    //     name='phone'
    //     autoComplete="username"
    //     helperText="Incorrect entry."
    //     onChange={handleInput}
    //   />}
    //   {validation ? <TextField id="password" label="Password" name='password' onChange={handleInput} type="password" /> : <TextField
    //     error
    //     id="standard-error-helper-text"
    //     label="Password"
    //     name='password'
    //     helperText="Incorrect entry."
    //     type="password"
    //     autoComplete="current-password"
    //     onChange={handleInput}
    //   />}
    //   {/* <TextField id="phone" label="Phone" name='phone' onChange={handleInput} />
    //   <TextField id="password" label="Password" name='password' onChange={handleInput} type="password" /> */}
    //   <Button variant="contained" color="primary" disableElevation onClick={login}>LogIn</Button>
    //   {props.isLoged ? <Redirect to='/main' /> : null}
    // </form>
  );
}))



export default Login
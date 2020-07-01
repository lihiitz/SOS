import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';


const EnterPage = (props) => {

  return (
    <div>
      {props.isLoged ? <Redirect to='/main' /> : null}
      <Link to='/login'><Button variant="contained" color="primary" disableElevation >LogIn</Button></Link>
      <Link to='/registration'>  <Button variant="contained" color="primary" disableElevation >Registration</Button></Link>
    </div>
  )
}

export default EnterPage

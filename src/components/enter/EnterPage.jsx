import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Login from './Login';



const EnterPage = (props) => {

  return (
    <div className='login-box'>
      {props.isLoged ? <Redirect to='/main' /> : null}
      {/* <Link to='/login'><Button variant="contained" color="primary" disableElevation >LogIn</Button></Link> */}
      <Login  login={props.login} isLoged={props.isLoged} />
      <p></p>
      <Link to='/registration' style={{textDecoration: "none"}}>  <Button style={{backgroundColor:"#202020", color:'white', border:'solid #c0392b 1px'}}className="registerbtn" variant="contained" color="primary" disableElevation >Registration</Button></Link>
    </div>
  )
}

export default EnterPage

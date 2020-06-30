import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Menu extends Component {
  render() {
    return (
      <div className='allLinks'>
        <Link to='/profilesettings'>Profile Settings</Link>
        <Link to="/contacts">Contacts</Link>
      </div>
    )
  }
}

export default Menu;
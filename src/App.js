import React, { Component } from 'react';
// import '../styles/App.css'
import { inject, observer } from 'mobx-react'
import { BrowserRouter as Router, Redirect, Link, Route } from 'react-router-dom'
import Login from './components/enter/Login'
import Registration from './components/enter/Registration'
import Profile from './components/Profile';
import EnterPage from './components/enter/EnterPage'
import GreenButton from './components/GreenButton';
import Timer from './components/Timer';
import AddNewContact from './components/AddNewContact';
import Main from './components/Main';
import Contacts from './components/Contacts';
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import MapContainer from './components/MapContainer';

@observer
@inject('userStore')
class App extends Component {
  constructor() {
    super()
    this.state = {
      isLoged: false
    }
  }

  login = async () => {
    await this.setState({
      isLoged: true
    })
    // const user = this.props.userStore
    // debugger
    // localStorage.setItem(`phone`, `${user.phone}`);
    // localStorage.setItem(`password`, `${user.password}`);
  }
  getLocation = () => {
      if(navigator.geolocation){
      console.log("location Available")
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude)
        this.props. userStore.location = position       
      })
    } else {
      console.log("Not Available")
    }
}
  componentDidMount() {
    const temp = localStorage.getItem('phone')
    if (temp) {
      const func = async () => {
        this.props.userStore.login(localStorage.getItem('phone'), localStorage.getItem('password'))
        this.setState({
          isLoged: true
        })
      }
      func()
      this.getLocation()
    }
  }

  //TO DO ADD SMTH IF USER PASSWORD WRONG!

  render() {

    return (
      <Router>
        <Route path="/" exact render={() => <EnterPage login={this.login} isLoged={this.state.isLoged} />} />
        <Route path="/registration" exact render={() => <Registration login={this.login} isLoged={this.state.isLoged} />} />
        {this.state.isLoged ? <Route path="/main" exact render={() => <Main />} /> : null}
        <Route path="/profile" exact render={() => <Profile />} />
        <Route path="/timer" exact render={() => <Timer />} />
        <Route path="/contacts" exact render={() => <Contacts />} />
        <Route path="/sosMap" exact render={() => <MapContainer />} />

      </Router>
    );
  }
}

export default App;


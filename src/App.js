import React, { Component } from 'react';
// import '../styles/App.css'
import { inject, observer } from 'mobx-react'
import { BrowserRouter as Router, Redirect, Link, Route } from 'react-router-dom'
import Login from './components/enter/Login'
import Registration from './components/enter/Registration'
import Profile from './components/Profile';
import EnterPage from './components/enter/EnterPage'
import GreenButton from './components/Timer/GreenButton';
import Timer from './components/Timer/Timer';
import AddNewContact from './components/AddNewContact';
import Main from './components/Main';
import Contacts from './components/Contacts';
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import MapContainer from './components/MapContainer';
import { useContext } from 'react' //import hook from react
import { MyContext } from './components/Topic';
import ContactSettings from './components/ContactSettings';
import MapPage from './components/MapPage';
import {subscribe} from './notifications/notifications-web-push';


//create context
@inject('userStore')
@observer
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
    // 
    // localStorage.setItem(`phone`, `${user.phone}`);
    // localStorage.setItem(`password`, `${user.password}`);
  }
  getLocation = () => {
    if (navigator.geolocation) {
      console.log("location Available")
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        console.log(position.coords.latitude, position.coords.longitude)
        this.props.userStore.location = position.coords
      })
    } else {
      console.log("Not Available")
    }
  }
  logout = async () => {
    await this.setState({
      isLoged: false
    })
  }

  componentDidMount() {
    const temp = localStorage.getItem('phone')
    if (temp) {
      const func = async () => {
        const user = await this.props.userStore.login(localStorage.getItem('phone'), localStorage.getItem('password'))

        if (user) {
          const subscription = await subscribe()
          const userModel = this.props.userStore

          // if the endpoint is different, we need to update the user
          if (userModel?.notificationSubscription?.endpoint !== subscription?.endpoint) {
         
            userModel.updateUser(userModel.name, userModel.phone, userModel.password, subscription)
          }
        }

        this.setState({
          isLoged: true
        })
      }

      func()
    }
    this.getLocation()
  }

  //TO DO ADD SMTH IF USER PASSWORD WRONG!

  render() {
    const value = { //object with context
      logout: this.logout,
    }

    return (
      <MyContext.Provider value={value}>
        <Router>
          <Route path="/" exact render={() => <EnterPage login={this.login} isLoged={this.state.isLoged} />} />
          <Route path="/registration" exact render={() => <Registration login={this.login} isLoged={this.state.isLoged} />} />
          {this.state.isLoged ? <Route path="/main" exact render={() => <Main />} /> : null}
          <Route path="/profile" exact render={() => <Profile />} />
          <Route path="/timer" exact render={() => <Timer />} />
          <Route path="/contacts" exact render={() => <Contacts />} />
          <Route path="/contactSettings" exact render={() => <ContactSettings />} />

          <Route path="/sosMap" exact render={() => <MapPage />} />

        </Router>
      </MyContext.Provider >

    );
  }
}


// MapContainer containerElement={<div style={{ height: `800px` }} />}
//     mapElement={<div style={{ height: `100%` }} />}loadingElement={<div style={{ height: `100%` }} />} googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCm8cj9dRisI1LeIqulbg68R8gHxcm2Q0M"/>
export default App;


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
import { useContext } from 'react' //import hook from react
import { MyContext } from './components/Topic';


 //create context

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
    // 
    // localStorage.setItem(`phone`, `${user.phone}`);
    // localStorage.setItem(`password`, `${user.password}`);
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
        this.props.userStore.login(localStorage.getItem('phone'), localStorage.getItem('password'))
        this.setState({
          isLoged: true
        })
      }
      func()
    }
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
          {/* <Route path="/login" exact render={() => <Login login={this.login} isLoged={this.state.isLoged} />} /> */}
          <Route path="/registration" exact render={() => <Registration login={this.login} isLoged={this.state.isLoged} />} />
          {this.state.isLoged ? <Route path="/main" exact render={() => <Main />} /> : null}
          {/* <Route path="/main" exact render={() => <Main />} /> */}
          <Route path="/profile" exact render={() => <Profile />} />
          <Route path="/timer" exact render={() => <Timer />} />
          <Route path="/contacts" exact render={() => <Contacts />} />
        </Router>
      </MyContext.Provider >

    );
  }
}

export default App;


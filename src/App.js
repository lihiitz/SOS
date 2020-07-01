import React, { Component } from 'react';
import './App.css';
import { inject, observer } from 'mobx-react'
import { BrowserRouter as Router, Redirect, Link, Route } from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'
import Main from './components/Main';
import Profile from './components/Profile';
import EnterPage from './components/EnterPage'

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

  componentDidMount() {
    const isUserinLocalstorage = localStorage.getItem('phone')
    if (isUserinLocalstorage) {
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

    return (
      <Router>
        <Route path="/" exact render={() => <EnterPage login={this.login} isLoged={this.state.isLoged} />} />
        <Route path="/login" exact render={() => <Login login={this.login} isLoged={this.state.isLoged} />} />
        <Route path="/registration" exact render={() => <Registration login={this.login} isLoged={this.state.isLoged} />} />
        {this.state.isLoged ? <Route path="/main" exact render={() => <Main />} /> : null}
        {/* <Route path="/main" exact render={() => <Main />} /> */}
        <Route path="/profilesettings" exact render={() => <Profile />} />

      </Router>
    );
  }
}

export default App;


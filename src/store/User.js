import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { observable, action } from 'mobx'
import Axios from 'axios'
const axios = require('axios')
// import { GoogleMap, LoadScript } from '@react-google-maps/api'

export class User {
  @observable name
  @observable phone
  @observable password
  @observable contacts
  @observable timer
  @observable location
  // @observable isLoged

  constructor() {
    this.id = ''
    this.name = ''
    this.phone = ''
    this.password = ''
    this.contacts = []
    this.timer = { isOn: false }
    this.location = null
    // this.isLoged = false
  }

  @action updateUser = async (newName, newPhone, newPassword) => {

    const user = { name: newName, phone: newPhone, password: newPassword }
    const response = await axios.put(`http://localhost:3001/profile/${this.id}`, user)
    // const response = await axios.put(`/profile/${this.id}`, user)
    if (response.data.msg === 'good') {
      const userData = response.data.user
      this.name = userData.name
      this.phone = userData.phone
      this.password = userData.password
    }
    if (response.data.msg === 'bad') {
      return (false)
    }
  }
  @action login = async (phone, password) => {
    // 
    const user = {
      phone: phone,
      password: password
    }
    const response = await axios.post('http://localhost:3001/login', user)
    // const response = await axios.post('/login', user)
    if (response.data.msg === 'good') {
      const userData = response.data.user
      this.id = userData._id
      this.name = userData.name
      this.password = userData.password
      this.phone = userData.phone
      this.contacts = userData.contacts
      this.timer = userData.timer
    } if (response.data.msg === 'bad') {
      return (false)
    }
  }


  @action registration = async (user) => {
    const response = await axios.post('http://localhost:3001/registration', user)
    // const response = await axios.post('/registration', user)
    if (response.data.msg === 'good') {
      const userData = response.data.user
      debugger
      this.id = userData._id
      this.name = userData.name
      this.password = userData.password
      this.phone = userData.phone
      this.contacts = userData.contacts
      this.timer = userData.timer
    } if (response.msg === 'bad') {
      return (false)
    }
  }

  @action addNewContact = async (name, phone) => {
    const contacts = { contacts: [{ contactName: name, contactPhone: phone }] }
    const id = this.id
    const response = await axios.put(`http://localhost:3001/contactsSettings/${id}`, contacts)
    // const response = await axios.put(`/contactsSettings/${id}`, contacts)
    if (response.data.msg === 'good') {
      const userData = response.data.user

      this.contacts = userData.contacts
    } if (response.msg === 'bad') {
      return (false)
    }
  }

  @action updateContact = async (name, newName, newPhone) => {
    const contact = { name: name, newName: newName, newPhone: newPhone }
    const id = this.id
    const response = await axios.put(`http://localhost:3001/contactSettings/${id}`, contact)
    const userData = response.data
    this.contacts = userData.contacts
  }

  @action deleteContact = async (name, phone) => {
    const contact = { contactName: name, contactPhone: phone }
    const id = this.id
    const response = await axios.put(`http://localhost:3001/contactSettingsD/${id}`, contact)
    debugger
    const userData = response.data
    this.contacts = userData.contacts
  }


  @action handleSos = async () => {    
    const sos = await Axios.post(`http://localhost:3001/sos/${this.id}`, {lat: this.location.latitude, lng: this.location.longitude, name: "sos"})

  }

  @action greenSignal = async (hours) => {
    const id = this.id
    const updatedUser = await Axios.post(`http://localhost:3001/timer/${id}`, { hours })
    // const updatedUser = await Axios.post(`/timer/${id}`, { hours })
    if (updatedUser.data.msg === "good") {
      this.timer = updatedUser.data.user.timer
    }
  }

  @action stopTimer = async () => {
    const updatedUser = await Axios.post(`http://localhost:3001/stopTimer/${this.id}`)
    // const updatedUser = await Axios.post(`/stopTimer/${this.id}`)
    if (updatedUser.data.msg === "good"){
      this.timer = { isOn: false }
    }else{
      //TODOOOOOOOO
    }
  }

  @action logOut = async () => {
    this.id = ''
    this.name = ''
    this.phone = ''
    this.password = ''
    this.contacts = []
    this.timer = { isOn: false }
  }

}
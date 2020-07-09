import { observable, action } from 'mobx'
// import io from 'socket.io-client'

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
  @observable notificationSubscription
  @observable socket

  constructor() {
    this.socket = null
    this.id = ''
    this.name = ''
    this.phone = ''
    this.password = ''
    this.contacts = []
    this.timer = { isOn: false }
    this.notificationSubscription = {
      endpoint: '',
      keys: {
        auth: '',
        p256dh: ''
      }
    }
    this.location = null
    // this.isLoged = false
  }

  // @action connectSocket () {
  //   this.socket = io.connect('http://localhost:3001')
  //   this.socket.on('refresh', () => {
  //     console.log("in socket");
      
  //     // window.location.reload(false);
  //   })
  // }
  @action updateUser = async (newName, newPhone, newPassword, notificationSubscription, timer) => {
    const user = { name: newName, phone: newPhone, password: newPassword }
    if (notificationSubscription) {
      user.notificationSubscription = notificationSubscription

    }
    if (timer) {
      user.timer = timer
    }


    const response = await axios.put(`/api/profile/${this.id}`, user)
    // const response = await axios.put(`/profile/${this.id}`, user)
    if (response.data.msg === 'good') {
      const userData = response.data.user
      this.name = userData.name
      this.phone = userData.phone
      this.password = userData.password
      this.notificationSubscription = userData.notificationSubscription
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
    const response = await axios.post('/api/login', user)
    // const response = await axios.post('/login', user)
    if (response.data.msg === 'good') {
      const userData = response.data.user
      this.id = userData._id
      this.name = userData.name
      this.password = userData.password
      this.phone = userData.phone
      this.contacts = userData.contacts
      this.timer = userData.timer
      this.notificationSubscription = userData.notificationSubscription

      return true
    } if (response.data.msg === 'bad') {
      return false
    }
  }


  @action registration = async (user) => {
    const response = await axios.post('/api/registration', user)
    // const response = await axios.post('/registration', user)
    if (response.data.msg === 'good') {
      const userData = response.data.user
      this.id = userData._id
      this.name = userData.name
      this.password = userData.password
      this.phone = userData.phone
      this.contacts = userData.contacts
      this.timer = userData.timer
      this.notificationSubscription = userData.notificationSubscription
    } if (response.msg === 'bad') {
      return (false)
    }
  }

  @action addNewContact = async (name, phone) => {
    const contacts = { contacts: [{ contactName: name, contactPhone: phone }] }
    const id = this.id
    const response = await axios.put(`/api/contactsSettings/${id}`, contacts)
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
    const response = await axios.put(`/api/contactSettings/${id}`, contact)
    const userData = response.data
    this.contacts = userData.contacts
  }

  @action deleteContact = async (name, phone) => {
    const contact = { contactName: name, contactPhone: phone }
    const id = this.id
    const response = await axios.put(`/api/contactSettingsD/${id}`, contact)
    const userData = response.data
    this.contacts = userData.contacts
  }


  @action handleSos = async () => {
    const sos = await Axios.post(`/api/sos/${this.id}`, { lat: this.location.latitude, lng: this.location.longitude, name: "sos" })
  }

  @action greenSignal = async (hours) => {
    const id = this.id
    const updatedUser = await Axios.post(`/api/timer/${id}`, { hours })
    // const updatedUser = await Axios.post(`/timer/${id}`, { hours })
    if (updatedUser.data.msg === "good") {
      this.timer = updatedUser.data.user.timer
    }
  }

  @action stopTimer = async () => {
    const updatedUser = await Axios.post(`/api/stopTimer/${this.id}`)
    // const updatedUser = await Axios.post(`/stopTimer/${this.id}`)
    if (updatedUser.data.msg === "good") {
      this.timer = { isOn: false }
    } else {
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
    this.notificationSubscription = null
  }

  @action makeCall = async () => {
    // Initialize phone number text input plugin
    const data = {
      phoneNumber: '+972544257318', //contsct
      salesNumber: '+972539528514' //user

    }
    // Call our ajax endpoint on the server to initialize the phone call
    await Axios.post(`/call/`, data)

    // }).fail(function (error) {
    //   alert(JSON.stringify(error));
    // });

  }


}
import { observable, action } from 'mobx'
import Axios from 'axios'
const axios = require('axios')

export class User {
  @observable name
  @observable phone
  @observable password
  @observable contacts
  @observable timer

  constructor() {
    this.id = ''
    this.name = ''
    this.phone = ''
    this.password = ''
    this.contacts = []
    this.timer = { isOn: false }
    // this.isLoged = false
  }
  @action updateUser = async (newName, newPhone, newPassword) => {

    const user = { name: newName, phone: newPhone, password: newPassword }
    const response = await axios.put(`http://localhost:3001/profile/${this.id}`, user)
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
    // debugger
    const user = {
      phone: phone,
      password: password
    }
    const response = await axios.post('http://localhost:3001/login', user)

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

    if (response.data.msg === 'good') {
      const userData = response.data.user
      // debugger
      this.id = userData._id
      this.name = userData.name
      this.password = userData.password
      this.phone = userData.phone
      this.contacts = userData.contacts
    } if (response.msg === 'bad') {
      return (false)
    }
  }

  @action addNewContact = async (name, phone) => {
    const contacts = { contacts: [{ name: name, phone: phone }] }
    const id = this.id
    const response = await axios.put(`http://localhost:3001/contactsSettings/${id}`, contacts)
  }

  @action handleSos = async () => {
    const sos = await Axios.post(`http://localhost:3001/sos/${this.id}`)
    console.log(sos.data)

  }

  @action greenSignal = async (hours) => {
    const id = this.id
    // debugger
    const updatedUser = await Axios.post(`http://localhost:3001/timer/${id}`, { hours })
    if (updatedUser.data.msg === "good") {
      this.timer = updatedUser.data.user.timer
    }
  }

}
import { observable, action } from 'mobx'
import Axios from 'axios'
const axios = require('axios')

export class User {
  @observable name
  @observable phone
  @observable password
  @observable contacts

  constructor() {
    this.id = ''
    this.name = ''
    this.phone = ''
    this.password = ''
    this.contacts = []

  }
  @action updateUser = (newName, newPhone, newPassword) => {
    this.name = newName
    this.phone = newPhone
    this.password = newPassword
  }
  @action login = async (phone, password) => {
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
      this.contacts=userData.contacts
    } if (response.data.msg === 'bad') {
      return (false)
    }
  }


  @action registration = async (user) => {
    const response = await axios.post('http://localhost:3001/registration', user)

    if (response.data.msg === 'good') {
      const userData = response.data.user
      debugger
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

}
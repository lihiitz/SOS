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
    // const response = {
    //   msg: 'good',
    //   obj: {
    //     _id: 'absbhdsjhagdbj',
    //     name: "Nika",
    //     phone: phone,
    //     password: password,
    //     contacts: [{ name: "fill", phone: '0543915915' }]
    //   }
    // }
    if (response.data.msg === 'good') {
      const user = response.data.user
      this.id = user._id
      this.name = user.name
      this.password = user.password
      this.phone = user.phone
      this.contacts = user.contacts
    } if (response.data.msg === 'bad') {
      return (false)
    }
  }


  @action registration = async (user) => {
    const response = await axios.post('http://localhost:3001/registration', user)
    debugger
    // const response = {
    //   msg: 'good',
    //   obj: {
    //     _id: 'absbhdsjhagdbj',
    //     name: user.name,
    //     phone: user.phone,
    //     password: user.password,
    //     contacts: []
    //   }
    // }
    if (response.data.msg === 'good') {
      const user = response.data.user
      debugger
      this.id = user._id
      this.name = user.name
      this.password = user.password
      this.phone = user.phone
      this.contacts = user.contacts
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
    const sos = await Axios.post(`http://localhost:3001/sos/5efb2c04d737ba204cd7f5b7`)
    console.log(sos.data)
    
  }

}
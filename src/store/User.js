import { observable, action } from 'mobx'
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
    // const response = await axios.post('http://localhost:3001/login', user)
    const response = {
      msg: 'good',
      obj: {
        _id: 'absbhdsjhagdbj',
        name: "Nika",
        phone: phone,
        password: password,
        contacts: [{ name: "fill", phone: '0543915915' }]
      }
    }
    if (response.msg === 'good') {
      const user = response.obj
      this.id = user._id
      this.name = user.name
      this.password = user.password
      this.phone = user.phone
      this.contacts = user.contacts
    } if (response.msg === 'bad') {
      return (false)
    }
  }


  @action registration = (user) => {
    // const response = await axios.post('http://localhost:3001/login', user)
    const response = {
      msg: 'good',
      obj: {
        _id: 'absbhdsjhagdbj',
        name: user.name,
        phone: user.phone,
        password: user.password,
        contacts: []
      }
    }
    if (response.msg === 'good') {
      const user = response.obj
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
    // const response = await axios.put('http://localhost:3001/contactssettings', contacts)
  }

}
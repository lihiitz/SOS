const mongoose = require(`mongoose`)
const Schema = mongoose.Schema
const cron = require('node-cron')


const userSchema = new Schema({
    name: String,
    phone: String,
    password: String,
    contacts: [], // contact = {name: string, phone: string}
    timer: {isOn: Boolean, duration: Number, startTime: {hours: Number, minutes: Number, seconds: Number}},
    marker: {}, //  {lat: Number, lng: Number, name: String}
    notificationSubscription: {
        endpoint: String,
        keys: {
            p256dh: String,
            auth: String
        }
    }
})

const User = mongoose.model(`User`, userSchema)
module.exports = User
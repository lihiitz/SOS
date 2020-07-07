const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const userSchema = new Schema({
    lat: Number,
    lng: Number,
    name: String,
    timeStamp: Number //in milliseconds
    // date: {} // date = {year: 2020, month: 7, day: 6, hours: 19, minutes: 34}
})

const Marker = mongoose.model(`Marker`, userSchema)
module.exports = Marker
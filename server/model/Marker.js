const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const userSchema = new Schema({
    lat: Number,
    lng: Number,
    name: String
})

const Marker = mongoose.model(`Marker`, userSchema)
module.exports = Marker
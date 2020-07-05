const express = require('express')
const router = express.Router()
const User = require(`../model/User`)
const Marker = require('../model/Marker')
const request = require('request')
const cron = require('node-cron')
const webpush = require("web-push")

const publicVapidKey = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo"
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";
webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey)

const accountSid = 'ACae72d5890e44228d4a9e4efc32f66c71'
const authToken = 'e3e2297a5e2e289bf691e309491a8465'
const client = require('twilio')(accountSid, authToken)
const VoiceResponse = require('twilio').twiml.VoiceResponse
const response = new VoiceResponse()
response.say('SOS from a friend')
console.log(response.toString());


// client.calls
//       .create({
//         //  url: 'http://demo.twilio.com/docs/voice.xml',
//         url: response.toString(),
//          to: '+972544257318',
//          from: '+12058905867'
//        }, function(err, call){
//            if (err){
//                console.log(err)
//            }else{
//                console.log(call.sid)
//             }
//        })
router.post("/subscribe", (req, res) => {
    // Get pushSubscription object
    const subscription = req.body
    // Send 201 - resource created
    res.status(201).json({})
    // Create payload
    const payload = JSON.stringify({ title: "Push Test" })
    // Pass object into sendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err))
})

// router.get('/markers', async function(req, res){ //
//     const markers = await User.find({}).select('markers')
//     res.send(markers.map(m => {
//         return(
//             m.markers
//         )
//     })) //markers = [{"markers": [{"lat": 24, "lng": 34, "name": "sos"}, {}..]}, {}..]
// })

router.post('/marker', function(req,res){//body = {lat: Number, lng: Number, name: String}
    const marker = new Marker(req.body)
    marker.save(function (err, marker) {
        if (err) {
            res.send({ msg: err })
        } else {
            res.send({ msg: "good", marker })
        }
    })
})

router.get('/markers', async function(req, res){ //
    const markers = await Marker.find({})
    res.send(markers)
})

router.post('/timer/:id', async function (req, res) { //body = {hours: Number}
    
    const d = new Date()
    let user = await User.findById(req.params.id)
    user.timer.isOn = true
    user.timer.startTime = { hours: d.getHours(), seconds: d.getSeconds(), minutes: d.getMinutes() }
    user.timer.duration = req.body.hours
    const updatedUser = await user.save()
    if (updatedUser) {
        res.send({ msg: "good", user: updatedUser })
    } else {
        res.send({ msg: "bad" })
    }
})

router.post('/stopTimer/:id', async function (req, res) {
    
    let user = await User.findById(req.params.id)
    user.timer.isOn = false
    const updatedUser = await user.save()
    if (updatedUser) {
        res.send({ msg: "good", user: updatedUser })
    } else {
        res.send({ msg: "bad" })
    }
})

router.post(`/registration`, function (req, res) { // body = {name: string, phone: string, password: string, contacts: []}
    
    const newUser = new User(req.body)
    newUser.save(function (err, user) {
        if (err) {
            res.send({ msg: err })
        } else {
            res.send({ msg: "good", user })
        }
    })
})

router.post(`/login`, function (req, res) {//body = {phon: string, password: string}
    
    User.find({ phone: req.body.phone, password: req.body.password }, function (err, user) {
        if (err) {
            res.send({ msg: err })
        }
        else if (user.length === 0) {
            res.send({ msg: "bad", user: null })
        } else {
            res.send({ msg: "good", user: user[0] })
        }
    })
})

router.post(`/sos/:id`, async function (req, res) { //body = {lat: Number, lng: Number, name: String}
    const user = await User.findOneAndUpdate({_id: req.params.id}, {marker: req.body})
    console.log(req.body.lat);
    
    sosCall(user, req.body)
    res.send(user)
})


router.put(`/profile/:id`, function (req, res) { //body: {name: string and/or phone: string and/or password: string}
    
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, user) {

        if (err) {
            res.send({ msg: err })
        } else {
            res.send({ msg: "good", user })
        }
    })
})

router.put(`/contactsSettings/:id`, function (req, res) { //body: {contacts: []}
    
    User.findOneAndUpdate({ _id: req.params.id }, { $push: { contacts: req.body.contacts } }, { new: true }, function (err, user) {
        if (err) {
            res.send({ msg: err })
        } else {
            res.send({ msg: "good", user })
        }
        //TODO : ADD NEW CONTACT ONLY IF IS NOT ALREADY IN LIST
    })
})

router.put(`/contactSettings/:id/:contactName`, async function (req, res) { // body : { name: string, phone: string}
    
    let user = await User.findById(req.params.id)
    const index = user.contacts.findIndex(c => c.name === req.params.contactName)
    user.contacts[index] = req.body
    await user.save()
    res.send(user)
})

const sosCall = function (user, location) {
    
    const numbers = user.contacts.map(c => c.contactPhone)
    numbers.forEach(c => {        
        const options = {
            'method': 'POST',
            'url': `https://http-api.d7networks.com/send?username=mukk3327&password=2LrJU2nW&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=smsinfo&content=SOS from ${user.name} in location: https://maps.google.com?saddr=Current+Location&daddr=${location.lat},${location.lng}&to=${c}`,
            // 'url': `https://http-api.d7networks.com/send?username=ruwz8400&password=9OuYSqQf&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=smsinfo&content=SOS from ${user.name} in location: latitude: ${location ? location.lat : 'unknown'}, longitude: ${location ? location.lng : 'unknown'}&to=${c}`,
            'headers': {
            },
            formData: {
            }
        }
        request(options, function (err, response) {
            if (err) {
                return ({ msg: err })
            } else {
                return ({ msg: "good", obj: response })
            }
        })
    })
}

const checkUserTimer = async function (user) {
    
    const now = new Date()
    const nowH = now.getHours()
    const nowM = now.getMinutes()
    const nowS = now.getSeconds()
    const nowTotal = (nowH * 3600) + (nowM * 60) + nowS
    const startH = user.timer.startTime.hours
    const startM = user.timer.startTime.minutes
    const startS = user.timer.startTime.seconds
    const startTotal = (startH * 3600) + (startM * 60) + startS
    // const duration = user.timer.duration * 3600
    //************************************************************************ */
    //TESTING - with minutes instead of hours **input will be in minutes and must be > 5
    const duration = user.timer.duration * 60
    //END TESTING******************************************************
    console.log(`duration: ${duration}, startTotal: ${startTotal}, nowTotal: ${nowTotal}
        duration + startTotal = ${duration + startTotal}`);
    if (duration + startTotal < nowTotal) {
        console.log("sos")
        sosCall(user)
        user.timer.isOn = false
        await user.save()
    } else if (duration - (5 * 60) + startTotal === nowTotal) {
        console.log("remainder 15 before timer ends")
        //do push notification
    }
}

const checkTimer = async function () {

    const task = cron.schedule('* * * * * *', () => {
        User.find().then(users => {
            // console.log(`current number of users: ${users.length}`)
            users.forEach(u => {
                if (u.timer.isOn) {
                    console.log(`user: ${u.name} timer is on`);
                    checkUserTimer(u)
                }
            })
        }, { scheduled: false })
    })
    task.start()
}

checkTimer()
module.exports = router
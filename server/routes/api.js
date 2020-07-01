const express = require('express')
const router = express.Router()
const User = require(`../model/User`)
const request = require('request')
const cron = require('node-cron')

const checkUserTimer = function(user){
const now = new Date()
const nowH = now.getHours()
const nowM = now.getMinutes() 
const nowS = now.getSeconds() 
const nowTotal = (nowH * 3600) + (nowM * 60) + nowS

const startH = user.timer.startTime.hours 
const startM = user.timer.startTime.minutes
const startS = user.timer.startTime.seconds
const startTotal = (startH * 3600) + (startM * 60) + startS

const diff = nowTotal - startTotal//res is in seconds
const diffH = Math.trunc(diff / 3600)
const r = diff % 3600
const diffM = Math.trunc(r / 60)

    // console.log(diffH)
    // console.log(diffM)
const duration = user.timer.duration * 3600

if (duration + startTotal < nowTotal){
    console.log("sos")
    user.timer.isOn = false
    
}

    
}

const checkTimer = async function(){
    const users = await User.find()
    const task = cron.schedule('* * * * * *', () => {
        console.log(`every 1 second`)
        users.forEach(u => {
           if (u.timer.isOn){
               checkUserTimer(u)
           } 
        })
    }, {scheduled: false})
    task.start()
}

router.post('/timer/:id', async function (req, res) { //body = {hours: Number}
    const d = new Date()
    // const hours = h + req.body.hours
    let user = await User.findById(req.params.id)
    user.timer.isOn = true
    user.timer.startTime = { hours: d.getHours(), seconds: d.getSeconds(), minutes: d.getMinutes() }
    user.timer.duration = req.body.hours
    // const test = '*/' + hours + ' * * *'
    const test = '*/' + 2 + ' * * * * *'
    // console.log(test)
    const task = cron.schedule(test, () => {
        console.log(`every ${req.body.hours} seconds`)
        //do sos router
    }, {scheduled: false})
    task.start()
    await user.save()
    checkUserTimer(user)

    res.send("ok")
})

router.post('/stopTimer/:id', async function (req, res) {
    let user = await User.findById(req.params.id)
    user.timer2.stop()
    res.send("ok")
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
        else {
            res.send({ msg: "good", user: user[0] })
        }
    })
})

router.post(`/sos/:id`, async function (req, res) { // return: {msg: string}
    const user = await User.findById(req.params.id)
    const numbers = user.contacts.map(c => c.contactPhone)
    numbers.forEach(c => {
        const options = {
            'method': 'POST',
            'url': `https://http-api.d7networks.com/send?username=krco3154&password=o8TDSoiD&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=smsinfo&content=lihi and fill&to=${c}`,
            'headers': {
            },
            formData: {
            }
        }
        request(options, function (err, response) {
            if (err) {
                res.send({ msg: err })
            } else {
                res.send({ msg: "good", obj: response })
            }
        })
    })
})

router.put(`/profileSettings/:id`, function (req, res) { //body: {name: string and/or phone: string and/or password: string}
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

checkTimer()
module.exports = router
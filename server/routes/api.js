const express = require('express')
const router = express.Router()
const User = require(`../model/User`)
const Marker = require('../model/Marker')
const request = require('request')
const cron = require('node-cron')
const webpush = require("web-push")

const accountSid = 'AC76f5bf833bdefe51ea72e17816b1f697'
const authToken = 'a236de200bf720d37bd1cf25d8723c3c'
const client = require('twilio')(accountSid, authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse
// const response = new VoiceResponse()


const publicVapidKey = "BCue7AbRMDE6GPH0DWhS9kishGryuSKQxGm1Y_otQG9ai8wwUPVsTGGY7_iW-iVp5jxM0Nu2fBz6dDUknd-AHRk"
const privateVapidKey = "SSAMmgW-Ytx0tMlNAfgUuL-h731zMjiQDCmX25NUJZ4";

webpush.setVapidDetails("mailto:adelson1606@gmail.com", publicVapidKey, privateVapidKey)


router.post('/call', function (request, response) {
    var salesNumber = request.body.salesNumber;
    var url = 'https://36bfcfecb919.ngrok.io' + '/outbound/' + encodeURIComponent(salesNumber); //CHANGE AND RUN NGROK!!!!!

    var options = {
        to: request.body.phoneNumber,
        from: '+18504469060',
        url: url
    };

    client.calls.create(options)
        .then((message) => {
            console.log(message.responseText);
            response.send({
                message: 'Thank you! We will be calling you shortly.',
            });
        })
        .catch((error) => {
            console.log(error);
            response.status(500).send(error);
        });
});

// Return TwiML instructions for the outbound call
router.post('/outbound/:salesNumber', function (request, response) {
    var salesNumber = request.params.salesNumber;
    console.log(salesNumber)
    var twimlResponse = new VoiceResponse();

    twimlResponse.say('We will connect you as soon as possible',
        { voice: 'alice' });
    console.log("making call")
    twimlResponse.dial(salesNumber);

    response.send(twimlResponse.toString());
});


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
// router.post("/subscribe", (req, res) => {
//     // Get pushSubscription object
//     const subscription = req.body
//     // Send 201 - resource created
//     res.status(201).json({})
//     // Create payload
//     const payload = JSON.stringify({ title: "Push Test" })
//     // Pass object into sendNotification
//     webpush
//         .sendNotification(subscription, payload)
//         .catch(err => console.error(err))
// })


router.post('/marker', function (req, res) {//body = {lat: Number, lng: Number, timeStamp: Number, name: String}
    const marker = new Marker(req.body)
    marker.save(function (err, marker) {
        if (err) {
            res.send({ msg: err })
        } else {
            res.send({ msg: "good", marker })
        }
    })
})

router.get('/markers', async function (req, res) { //
    const markers = await Marker.find({})
    res.send(markers)
})

router.post('/timer/:id', async function (req, res) { //body = {hours: Number}

    const d = new Date()
    let user = await User.findById(req.params.id)
    user.timer = { isOn: true, duration: req.body.hours, notificationSent: false, startTime: { hours: d.getHours(), seconds: d.getSeconds(), minutes: d.getMinutes(), timeStamp: Date.now() } }
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
            res.send({ msg: "good", user: user.toJSON() })
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
    const user = await User.findOneAndUpdate({ _id: req.params.id }, { marker: req.body })
    console.log(req.body.lat);
    sosCall(user, req.body) //DO NOT REMOVE THISSSSSS. UNCOMMENT WHEN ALL SET
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

router.put(`/contactSettings/:id`, async function (req, res) { // body : { name: string, phone: string newName:string, newPhone: string}

    let user = await User.findById(req.params.id)
    const index = user.contacts.findIndex(c => c.contactName === req.body.name)
    // user.contacts[index] = req.body
    const newData = {
        contactName: req.body.newName,
        contactPhone: req.body.newPhone
    }
    user.contacts[index] = newData
    await user.save()
    res.send(user)
})

router.put(`/contactSettingsD/:id`, async function (req, res) { // body : { name: string, phone: string}

    let user = await User.findById(req.params.id)
    const index = user.contacts.findIndex(c => c.contactName === req.body.contactName)
    user.contacts.splice(index, 1)
    await user.save()
    res.send(user)
})

const sosCall = function (user, location) {
    const numbers = user.contacts.map(c => c.contactPhone)
    numbers.forEach(c => {
        console.log(location)
        const url = location ? `https://http-api.d7networks.com/send?username=pnwy7599&password=Uw2Lh3cO&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=SOS-APP&content=SOS from ${user.name} in location: https://maps.google.com/?q=${location.lat},${location.lng}&to=${c}` : `https://http-api.d7networks.com/send?username=pnwy7599&password=Uw2Lh3cO&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=SOS-APP&content=SOS from ${user.name}&to=${c}`
        const options = {
            'method': 'POST',
            // 'url': `https://http-api.d7networks.com/send?username=pnwy7599&password=Uw2Lh3cO&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=SOS-APP&content=SOS from ${user.name} in location: https://maps.google.com/?q=${location.lat},${location.lng}&to=${c}`,
            'url': url,
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



const payload = JSON.stringify({
    title: 'SoSApp',
    body: {
        body: 'Are you ok? Cancel your timer or we will send SOS signal in 15 minutes',
        icon: 'https://vignette.wikia.nocookie.net/starbase-fanon/images/2/28/SOS-icon.png/revision/latest?cb=20190809222911',
    }
});

const HOURSTOMS = 3600000
const MINUTESBEFORE = 15
const MINUTESTOMS = 60000

// const checkUserTimer = async function (user) {

//     const now = new Date()
//     const nowH = now.getHours()
//     const nowM = now.getMinutes()
//     const nowS = now.getSeconds()
//     const nowTotal = (nowH * 3600) + (nowM * 60) + nowS
//     const startH = user.timer.startTime.hours
//     const startM = user.timer.startTime.minutes
//     const startS = user.timer.startTime.seconds
//     const startTotal = (startH * 3600) + (startM * 60) + startS
//     // const duration = user.timer.duration * 3600
//     //************************************************************************ */
//     //TESTING - with minutes instead of hours **input will be in minutes and must be > 5
//     const duration = user.timer.duration * 60
//     //END TESTING******************************************************
//     console.log(`duration: ${duration}, startTotal: ${startTotal}, nowTotal: ${nowTotal}
//         duration + startTotal = ${duration + startTotal}`);


//     if ((nowTotal - startTotal) === 5) {
//         await webpush.sendNotification(user.notificationSubscription, payload)
//     }

//     if (duration + startTotal < nowTotal) {
//         console.log("sos")
//         // sosCall(user)
//         user.timer.isOn = false
//         await user.save()
//     } else if (duration - (5 * 60) + startTotal === nowTotal) {
//         console.log("remainder 15 before timer ends")
//         await webpush.sendNotification(user.notificationSubscription, payload)
//         //do push notification
//     }
// }
// const checkUserTimer = async function (user) { //origin

//     const nowMS = Date.now()
//     const startMS = user.timer.startTime.timeStamp
//     const durationMS = user.timer.duration * HOURSTOMS
//     const endMS = startMS + durationMS
//     const timeBeforeEnd = endMS - (MINUTESBEFORE * MINUTESTOMS)

//     if (timeBeforeEnd  === nowMS || timeBeforeEnd  === (nowMS + MINUTESTOMS) || timeBeforeEnd === (nowMS - MINUTESTOMS)) {
//         await webpush.sendNotification(user.notificationSubscription, payload)
//     }

//     if (endMS >= nowMS) {
//         console.log("sos")
//         sosCall(user)
//         user.timer.isOn = false
//         await user.save()
//     }
// }

const checkUserTimer = async function (user) { //for tests only! duration = 1 minute and 15 minutes before  = 15 seconds

    const nowMS = Date.now()
    const startMS = user.timer.startTime.timeStamp
    const durationMS = MINUTESTOMS
    const endMS = startMS + durationMS
    const timeBeforeEnd = endMS - 15000

    // if (timeBeforeEnd === nowMS || timeBeforeEnd === (nowMS + 1000) || timeBeforeEnd === (nowMS - 1000)) {
    if (timeBeforeEnd <= nowMS && !user.timer.notificationSent) {
        await webpush.sendNotification(user.notificationSubscription, payload)
        user.timer.notificationSent = true
        await user.save()
        console.log("15 seconds before timer end");
    }

    if (endMS <= nowMS) {
        console.log("sos")
        await webpush.sendNotification(user.notificationSubscription, payload)
        sosCall(user, null)
        user.timer.isOn = false
        await user.save()
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
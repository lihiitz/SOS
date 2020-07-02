const express = require('express')
const router = express.Router()
const User = require(`../model/User`)
const request = require('request')

const formatPhoneNumber = function(number){
    let res = "+972" + number.slice(1)
    return res
}

router.post(`/registration`, function (req, res) { // body = {name: string, phone: string, password: string, contacts: []}
// const tempUser = req.body
// tempUser.phone = formatPhoneNumber(tempUser.phone)
// tempUser.contacts.forEach(c => {
//     c.phone = formatPhoneNumber(c.phone)
// })
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
    User.find({phone: req.body.phone, password: req.body.password}, function (err, user) {
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
            if (err){
                res.send({msg: err})
            }else{
                res.send({msg: "good", obj: response})
            }
          })
    })
})

router.put(`/profile/:id`, function (req, res) { //body: {name: string and/or phone: string and/or password: string}
    User.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, function (err, user) {
        if (err) {
            res.send({ msg: err })
        } else {
            res.send({ msg: "good", user })
        }
    })
})

router.put(`/contactsSettings/:id`, function (req, res) { //body: {contacts: []}
    User.findOneAndUpdate({ _id: req.params.id }, { $push: { contacts: req.body.contacts } }, {new: true}, function (err, user) {
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

module.exports = router
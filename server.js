const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const mongoose = require(`mongoose`)

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/sos`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })




// const options = {
//   setHeaders: function (res, path, stat) {
//       res.set('Service-Worker-Allowed', '/');
//   },
// };

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  
    next()
})
  
app.use('/api', api)

module.exports = {
    app
}

//for heroku
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// })
//end for heroku


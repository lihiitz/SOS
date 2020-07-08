
const express = require('express')
const path = require('path')

const {app} = require('./server')

app.use(express.static(path.join(__dirname, "public")))


const PORT = 5000
app.listen(process.env.PORT || PORT, function(){
    console.log(`running on port ${PORT}`)
})
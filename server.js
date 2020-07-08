
const express = require('express')
const path = require('path')
const { app } = require('./server-common')

//const http = require('http').createServer(app)


app.use(express.static(path.join(__dirname, "public")))


const PORT = 3001
const server = app.listen(process.env.PORT || PORT, function () {
    console.log(`running on port ${PORT}`)
})

const io = require('socket.io')(server)
io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('new marker', () => {
        io.emit('refresh')
    })
})
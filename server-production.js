
const express = require('express')
const path = require('path')

const { app } = require('./server-common')


app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static(path.join(__dirname, 'node_modules')));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build/index.html'));
});


const PORT = 3001
// app.listen(process.env.PORT || PORT, function () {
//     console.log(`running on port ${PORT}`)
// })

//remove it if will not work
const server = app.listen(process.env.PORT || PORT, function () {
    console.log(`running on port ${PORT}`)
})
const io = require('socket.io')(server)
io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('new marker', () => {
        io.emit('refresh')
    })
    socket.on('timer', () => {
        io.emit()
    })
})
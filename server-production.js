
const express = require('express')
const path = require('path')

const { app } = require('./server-common')

app.use(express.static(path.join(__dirname, 'build')));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build/index.html'));
});


const PORT = 3001
app.listen(process.env.PORT || PORT, function () {
    console.log(`running on port ${PORT}`)
})
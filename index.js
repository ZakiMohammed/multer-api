const express = require('express')

const app = express()

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile('index.html')
})

app.use('/', require('./routes/upload'))

app.listen(3000, () => console.log('Server is running on 3000'))
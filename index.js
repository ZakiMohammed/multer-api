const express = require('express')

const app = express()

// static files
app.use(express.static('public'))
app.use('/assets', express.static('/public/assets'))
app.use('/uploads', express.static('uploads'))

app.get('/', function (req, res) {
    res.sendFile('index.html')
})

app.use('/', require('./routes/upload'))

app.listen(3000, () => console.log('Server is running on 3000'))
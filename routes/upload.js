const express = require('express')
const upload = require('./../multer')

const router = express.Router();

router.post('/upload-file', upload.single('avatar'), function (req, res, next) {
    console.log(req.file);
    res.json('File received');
})

router.post('/upload-files', upload.array('avatar'), function (req, res, next) {
    console.log(req.files);
    res.json('Files received');
})

module.exports = router;

const express = require('express')
const upload = require('./../multer')

const router = express.Router();

router.post('/upload-file', upload.single('avatar'), function (req, res, next) {
    console.log(req.file);
    res.json({
        message: 'File uploaded',
        files: req.file
    });
})

router.post('/upload-files', upload.array('avatar'), function (req, res, next) {
    console.log(req.files);
    res.json({
        message: 'Files uploaded',
        files: req.files
    });
})

router.post('/upload-form-file', upload.single('avatar'), function (req, res, next) {
    console.log(req.file);
    res.redirect('/?message=File uploaded');
})

router.post('/upload-form-files', upload.array('avatar'), function (req, res, next) {
    console.log(req.files);
    res.redirect('/?message=Files uploaded');
})

module.exports = router;

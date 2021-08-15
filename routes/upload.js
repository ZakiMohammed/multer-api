const express = require('express')
const fs = require('fs')
const upload = require('./../multer')

const router = express.Router();

router.get('/get-files', function (req, res) {

    const files = fs.readdirSync('uploads');
    const stats = files.map(file => ({
        name: file,
        ...fs.statSync(`uploads/${file}`)
    })).sort((a, b) => b.ctimeMs - a.mtimeMs);

    res.json(stats.map(i => i.name));
})

router.get('/remove-files', function (req, res) {

    const files = fs.readdirSync('uploads');
    files.forEach(fileName => fs.unlinkSync(`uploads/${fileName}`));

    res.json({
        message: 'Files removed',
    });
})

router.get('/remove-file/:fileName', function (req, res) {

    const fileName = req.params.fileName;
    fs.unlinkSync(`uploads/${fileName}`);

    res.json({
        message: 'File removed',
    });
})

router.post('/upload-file', upload.single('avatar'), function (req, res) {
    res.json({
        message: 'File uploaded',
        files: req.file
    });
})

router.post('/upload-files', upload.array('avatar'), function (req, res) {
    res.json({
        message: 'Files uploaded',
        files: req.files
    });
})

router.post('/upload-form-file', upload.single('avatar'), function (req, res, next) {
    res.redirect('/?message=File uploaded');
})

router.post('/upload-form-files', upload.array('avatar'), function (req, res, next) {
    res.redirect('/?message=Files uploaded');
})

module.exports = router;

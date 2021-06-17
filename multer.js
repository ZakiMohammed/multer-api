const multer = require('multer')
const uuid = require('uuid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const originalnameSplit = file.originalname.split('.');
        cb(null, `${uuid.v4()}.${originalnameSplit[1]}`)
    }
})
const upload = multer({ storage })

module.exports = upload;

const multer = require('multer')
const uuid = require('uuid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const nameSplit = file.originalname.split('.');
        const extension = nameSplit.length ? nameSplit[nameSplit.length - 1] : '';
        cb(null, `${uuid.v4()}.${extension}`)
    }
})
// const upload = multer({ dest: 'uploads' });
const upload = multer({ storage });

module.exports = upload;

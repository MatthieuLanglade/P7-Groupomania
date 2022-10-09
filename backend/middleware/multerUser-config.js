const multer = require('multer')
const MIME_TYPES = {
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg',
    'image/png' : 'png',
    'image/gif' : 'gif'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images/users/')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    }
})

module.exports = multer({storage}).single('profilPicture')
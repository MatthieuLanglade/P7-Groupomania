const multer = require('multer')
const MIME_TYPES = {
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg',
    'image/png' : 'png',
    'image/gif' : 'gif'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images/posts/')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        callback(null, Date.now() + name + '.' + extension)
    }
})

module.exports = multer({storage}).single('image')
const multer = require('multer')

const FILE_TYPE = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/png': 'png' 
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE[file.mimetype]
        let uploadError = new Error('Wrong file type')
        if(isValid){
            uploadError = null
        }

      cb(uploadError, './public/uploads')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split(' ').join('-')
      cb(null, `${Date.now()}-${fileName}`)
    }
  })
  
  const uploadImage = multer({ storage: storage })

  module.exports = {uploadImage}
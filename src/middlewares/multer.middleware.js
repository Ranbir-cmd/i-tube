import multer from "multer"

const storage = multer.diskStorage({
    // will save files in destination folder
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    // and retun file. here asking to  give originalname of file
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage: storage })
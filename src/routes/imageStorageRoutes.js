import express from 'express'
import multer from 'multer'
import { handleImageUpload } from '../controllers/imageStorageController.js'

const router = express.Router()

const storage = multer.memoryStorage()

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Not an image! Please upload only images.'), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB limit for uploads, adjust as needed
  }
})

// Route for image upload. 'imageFile' is the field name for the uploaded file.
router.post('/upload', upload.single('imageFile'), handleImageUpload)

// Middleware to handle multer errors specifically (like file type or size limit)
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File is too large. Maximum size is 10MB.' })
    }
    return res.status(400).json({ success: false, message: `File upload error: ${error.message}` })
  } else if (error) {
    if (error.message === 'Not an image! Please upload only images.') {
      return res.status(400).json({ success: false, message: error.message })
    }
    console.error('Unhandled error in image storage route:', error)
    return res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
  next()
})

export default router 
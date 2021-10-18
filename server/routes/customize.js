import express from 'express'
import multer from 'multer'

import { fetchImages, deleteSlideImage, uploadSlideImage, allData } from '../controller/customize.js'

const router = express.Router()

// CUSTOMIZE IMAGE UPLOAD SETTINGS
const destination = (req, file, cb) => { cb(null, './public/uploads/customize') }
const filename = (req, file, cb) => { cb(null, `${Date.now()}_${file.originalname}`) }
const storage = multer.diskStorage({ destination, filename })
const upload = multer({ storage })

// CUSTOMIZE ROUTES
router.route('/get-slide-image').get(fetchImages)
router.route('/delete-slide-image').post(deleteSlideImage)
router.route('/upload-slide-image').post(upload.single('image'), uploadSlideImage)
router.route('/dashboard-data').post(allData)

export default router
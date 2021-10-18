import express from 'express'
import multer from 'multer'

import { allCategory, addCategory, editCategory, deleteCategory, singleCategory } from '../controller/categories.js'
import { loginCheck, isAdmin } from '../middleware/auth.js'

const router = express.Router()

// CATEGORY IMAGE UPLOAD SETTINGS
const destination = (req, file, cb) => { cb(null, './public/uploads/categories') }
const filename = (req, file, cb) => { cb(null, `${Date.now()}_${file.originalname}`) }
const storage = multer.diskStorage({ destination, filename })
const upload = multer({ storage })

// CATEGORY ROUTES
router.route('/all-category').get(allCategory)
router.route('/single-category').post(singleCategory)
router.route('/add-category').post(loginCheck, isAdmin, upload.single('cImage'), addCategory)
router.route('/edit-category').post(loginCheck, isAdmin, editCategory)
router.route('/delete-category').post(loginCheck, isAdmin, deleteCategory)

export default router
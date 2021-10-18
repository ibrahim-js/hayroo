import express from 'express'

import * as authController from '../controller/auth.js'
import { loginCheck, isAuth, isAdmin } from '../middleware/auth.js'

const router = express.Router()

// @PREFIX /api
router.route('/current-user').post(authController.currentUser)
router.route('/signup').post(authController.signup)
router.route('/signin').post(authController.signin)
router.route('/user').post(loginCheck, isAuth, isAdmin, authController.allUser)

export default router
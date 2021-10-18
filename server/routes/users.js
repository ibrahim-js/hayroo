import express from 'express'

import { allUsers, singleUser, editUser, deleteUser, changePassword } from '../controller/users.js'
import { loginCheck, isAdmin } from '../middleware/auth.js'

const router = express.Router()

router.route('/all-user').get(loginCheck, isAdmin, allUsers)
router.route('/single-user').post(singleUser)

// router.route('/add-user').post(addUser)
router.route('/edit-user').post(editUser)
router.route('/delete-user').post(deleteUser)

router.route('/change-password').post(loginCheck, changePassword)

export default router
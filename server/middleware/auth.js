import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/keys.js'
import UserModel from '../models/users.js'

export const loginCheck = (req, res, next) => {
  try {
    const token = req.headers.token.replace('Bearer ', '')

    const decoded = jwt.verify(token, JWT_SECRET)

    req.userDetails = decoded

    next()
  } catch (error) {
    res.json({ error: "You must be logged in" })
  }
}

export const isAuth = (req, res, next) => {
  const { loggedInUserId } = req.body

  if ( !loggedInUserId || !req.userDetails._id || loggedInUserId != req.userDetails._id) 
    res.status(403).json({ error: 'You are not authenticated' })

  next()
}

export const isAdmin = async (req, res, next) => {
  const { _id } = req.userDetails

  if (!_id)
    return res.json({ error: 'You must be logged in' })

  try {
    const reqUser = await UserModel.findById(_id)

    if (reqUser.userRole === 0)
      return res.status(403).json({ error: 'Access denied' })

    next()
  } catch (error) {
    res.status(404)
  }
}

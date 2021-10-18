import bcrypt from 'bcryptjs'
import UserModel from '../models/users.js'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/keys.js'
import { toTitleCase, validateEmail } from '../config/function.js'

// @Desc  DECODE TOKEN DATA
// Route  POST /api/current-user
export const currentUser = async (req, res) => {
  let { token } = req.headers
  
  if (!token)
    return res.json({ error: 'User not logged in' })

  token = token.split(' ')[1]
  
  const decode = jwt.verify(token , JWT_SECRET)

  const userData = await UserModel.findById(decode._id)

  if (!userData || !decode._id)
    return res.json({ error: 'Something went wrong' })

  res.json({ success: true, user: {
    _id: userData._id,
    name: userData.name,
    phone: userData.phoneNumber,
    email: userData.email,
    role: userData.userRole
  }})
}

// @Desc  FETCH USERS
// Route  POST /api/user
export const allUser = async (req, res) => {
  try {
    const users = await UserModel.find()

    res.json({ users })
  } catch (error) {
    res.json({ error })
  }
}

// @Desc  REGISTER USER
// Route  POST /api/signup
export const signup = async (req, res) => {
  const { name, email, password, cPassword } = req.body
  let error

  if (!name || !email || !password || !cPassword)
    return res.json({ error: 'All fields are required' })

  if (!validateEmail(email)) {
    error = {
      ...error,
      password: '',
      name: '',
      email: 'Email is not valid'
    }
    return res.json({ error })
  }

  if (password.length < 8) {
    error = {
      ...error,
      name: '',
      email: '',
      password: 'Password must be at least 8 characters'
    }
    return res.json({ error })
  }

  try {
    const data = await UserModel.findOne({ email })

    if (data) {
      error = {
        ...error,
        password: '',
        name: '',
        email: 'Email already exists'
      }
      return res.json({ error })
    }

    const formatedName = toTitleCase(name)
    const hashedPass = bcrypt.hashSync(password, 10)

    const newUser = new UserModel({ name: formatedName, password: hashedPass, email })

    await newUser.save()

    res.json({ success: 'Account created successfully. You will be directed to login after 5 sec...' })
  } catch (error) {
    res.json({ error })
  }
}

// @Desc  LOGIN USER
// Route  POST /api/signin
export const signin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.json({ error: 'All fields are required' })

  try {
    const data = await UserModel.findOne({ email })

    if (!data)
      return res.json({ error: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, data.password)

    if (!isMatch)
      return res.json({ error: 'Invalid credentials' })

    const token = jwt.sign({ _id: data._id, name: data.name, phone: data.phoneNumber, email: data.email, role: data.userRole }, JWT_SECRET)

    res.json({ token, user: { _id: data._id, name: data.name, phone: data.phoneNumber, email: data.email, role: data.userRole } })
  } catch (error) {
    res.json({ error })
  }
}
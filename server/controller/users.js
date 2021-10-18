import bcrypt from 'bcryptjs'

import UserModel from '../models/users.js'
import { toTitleCase } from '../config/function.js'

export const allUsers = async (req, res) => {
  try {
    const users = await UserModel
                        .find()
                        .populate('allProduct.id', 'pName pImages pPrice')
                        .populate('user', 'name email')
                        .sort({ _id: -1 })

    res.json({ users })
  } catch (error) {
    res.json({ error })
  }
}

export const singleUser = async (req, res) => {
  const { uId } = req.body

  if (!uId)
    return res.json({ error: 'Please provide an user ID' })

  try {
    const user = await UserModel.findById(uId).select('name email phoneNumber userImage updatedAt createdAt')

    res.json({ user })
  } catch (error) {
    res.json({ error })
  }
}

export const editUser = async (req, res) => {
  const { uId, name, phoneNumber } = req.body

  if (!uId || !name || !phoneNumber)
    return res.json({ error: 'All fields are required' })

  try {
    await UserModel.findByIdAndUpdate(uId, { name: toTitleCase(name), phoneNumber, updatedAt: Date.now() })

    res.json({ success: 'User updated successfully' })
  } catch (error) {
    res.json({ error })
  }
}

export const deleteUser = async (req, res) => {
  const { uId } = req.body

  if (!uId)
    return res.json({ error: 'Please provide an ID' })

  try {
    await UserModel.findByIdAndRemove(uId)

    res.json({ success: 'User deleted successfully' })
  } catch (error) {
    res.json({ error })
  }
}

export const changePassword = async (req, res) => {
  const { uId, oldPassword, newPassword } = req.body

  if (!uId || !oldPassword || !newPassword)
    return res.json({ error: 'All fields are required' })

  try {
    const data = await UserModel.findOne({ _id: uId })

    if (!data)
      return res.json({ error: 'Invalid user' })

    const isMatch = await bcrypt.compare(oldPassword, data.password)
    
    if (!isMatch)
      return res.json({ error: 'Password is incorrect' })

    if (newPassword.length < 8)
      return res.json({ error: 'Password must be at least 8 characters' })

    const newHashedPassword = bcrypt.hashSync(newPassword, 10)

    await UserModel.findByIdAndUpdate(uId, { password: newHashedPassword })

    res.json({ success: 'Password updated successfully' })
  } catch (error) {
    res.json({ error })
  }
}

// export const addUser = async (req, res) => {
//   const { allProduct, user, amount, transactionId, address, phone } = req.body

//   if (!allProduct || !user || !amount || !transactionId || !address || !phone)
//     return res.json({ error: 'All fields are required' })

//   try {
//     const newUser = new UserModel({ allProduct, user, amount, transactionId, address, phone })

//     await newUser.save()

//     res.json({ success: 'User created successfully' })
//   } catch (error) {
//     res.json({ error })
//   }
// }
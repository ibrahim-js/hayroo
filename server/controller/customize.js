import fs from 'fs'

import CategoryModel from '../models/categories.js'
import ProductModel from '../models/products.js'
import OrderModel from '../models/orders.js'
import UserModel from '../models/users.js'
import CustomizeModel from '../models/customize.js'

export const fetchImages = async (req, res) => {
  try {
    const images = await CustomizeModel.find()

    res.json({ images })
  } catch (error) {
    res.json({ error })
  }
}

export const uploadSlideImage = async (req, res) => {
  const image = req.file.filename

  if (!image)
    return res.json({ error: 'All fields are required' })

  try {
    const newCustomize = new CustomizeModel({ slideImage: image })

    const newImage = await newCustomize.save()

    res.json({ success: true, customize: newImage  })
  } catch (error) {
    res.json({ error })
  }
}

export const deleteSlideImage = async (req, res) => {
  const { id } = req.body

  if (!id)
    return res.json({ error: 'All fields are required' })

  try {
    const targetCustomize = await CustomizeModel.findById(id)
    const filePath = `../server/public/uploads/customize/${targetCustomize.slideImage}`

    await CustomizeModel.findByIdAndDelete(id)

    fs.unlink(filePath, err => {
      if (err)
        console.log(err)

      return res.json({ success: 'Image deleted successfully' })
    })
  } catch (error) {
    res.json({ error })
  }
}

export const allData = async (req, res) => {
  try {
    const categories = await CategoryModel.find().count()
    const products = await ProductModel.find().count()
    const orders = await OrderModel.find().count()
    const users = await UserModel.find().count()

    res.json({ categories, products, orders, users })
  } catch (error) {
    res.json({ error })
  }
}
import CategoryModel from '../models/categories.js'
import { toTitleCase, deleteFile } from '../config/function.js'

export const allCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ _id: -1 })

    res.json({ categories })
  } catch (error) {
    res.json({ error })
  }
}

// @Desc  DATA ABOUT SINGLE CATEGORY
// Route  POST /api/category/single-category
export const singleCategory = async (req, res) => {
  const { catId } = req.body

  if (!catId)
    return res.json({ error: 'All fields are required' })

  try {
    const category = await CategoryModel.findById(catId)

    if (!category)
      return res.json({ error: 'No category found with that ID' })

    res.json({ category })
  } catch (error) {
    res.json({ error })
  }
}

export const addCategory = async (req, res) => {
  const { cName, cDescription, cStatus } = req.body
  const cImage = req.file?.filename
  
  const filePath = `../server/public/uploads/categories/${cImage}`

  if (!cName || !cDescription || !cStatus || !cImage)
    return deleteFile(filePath, res, 'All fields are required')

  try {
    const checkDuplicate = await CategoryModel.findOne({ cName })

    if (checkDuplicate)
      return deleteFile(filePath, res, 'Category already exists')

    const newCat = new CategoryModel({ cName : toTitleCase(cName), cDescription, cStatus, cImage })

    await newCat.save()

    res.json({ success: 'Category created successfully' })
  } catch (error) {
    res.json({ error })
  }
}

export const editCategory = async (req, res) => {
  const { cId, cDescription, cStatus } = req.body

  if (!cId || !cDescription || !cStatus)
    return res.json({ error: 'All fields are required' })

  try {
    await CategoryModel.findByIdAndUpdate(cId, { cDescription, cStatus, updatedAt: Date.now() })

    res.json({ success: 'Category updated successfully' })
  } catch (error) {
    res.json({ error })
  }
}

export const deleteCategory = async (req, res) => {
  const cId = req.body.cId

  if (!cId)
    return res.json({ error: 'All fields are required' })

  try {
    const targetedCat = await CategoryModel.findById(cId)
    const filePath = `../server/public/uploads/categories/${targetedCat.cImage}`

    await CategoryModel.findByIdAndDelete(cId)

    deleteFile(filePath, res, 'Category deleted successfully')
  } catch (error) {
    res.json({ error })
  }
}
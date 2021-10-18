import ProductModel from '../models/products.js'
import CategoryModel from '../models/categories.js'
import { deleteImages } from '../config/function.js'

export const fetchProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().populate('pCategory', '_id cName').sort({ _id: -1 })
    
    res.json({ products })
  } catch (error) {
    res.json({ error })
  }
}

export const addProduct = async (req, res) => {
  const { pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus } = req.body
  const images = req.files

  if (!pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pOffer || !pStatus) {
    deleteImages(images, 'file')
    return res.json({ error: 'All fields are required' })
  }

  if (pName.length > 255 || pDescription.length > 3000) {
    deleteImages(images, 'file')
    return res.json({ error: 'Name must be at most 255 characters and description 3000 characters' })
  }

  if (images.length !== 2) {
    deleteImages(images, 'file')
    return res.json({ error: 'Must provide 2 images for each product' })
  }

  try {
    let allImages = []
    
    for (const img of images) { allImages.push(img.filename) }

    const newProduct = new ProductModel({ pImages: allImages, pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus })

    await newProduct.save()

    res.json({ success: 'Product created successfully' })
  } catch (error) {
    res.json({ error })
  }
}

export const editProduct = async (req, res) => {
  const { pId, pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus, pImages } = req.body
  const editImages = req.files

  console.log(req.body)
  console.log(editImages)

  if (!pId || !pName || !pDescription || !pPrice || !pQuantity || !pCategory || !pOffer || !pStatus || !pImages)
    return res.json({ error: 'All fields are required' })

  if (pName.length > 255 || pDescription.length > 3000) 
    return res.json({ error: 'Name must be at most 255 characters and description 3000 characters' })
 
  if (!editImages.length) {
    await ProductModel.findByIdAndUpdate(pId, { pId, pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus, pImages: pImages.split(',') })

    return res.json({ success: 'Product edited successfully' })
  }

  if (editImages.length !== 2) {
    deleteImages(editImages, 'file')
    return res.json({ error: 'Must provide 2 images for each product' })
  }

  try {
    let allEditImages = []

    for (const img of editImages) { allEditImages.push(img.filename) }

    deleteImages(pImages.split(','), 'string')

    await ProductModel.findByIdAndUpdate(pId, { pId, pName, pDescription, pPrice, pQuantity, pCategory, pOffer, pStatus, pImages: allEditImages })

    res.json({ success: 'Product edited successfully' })
  } catch (error) {
    res.json({ error })
  }
}

export const deleteProduct = async (req, res) => {
  const { pId } = req.body

  if (!pId)
    return res.json({ error: 'All fields are required' })

  try {
    const targetedProduct = await ProductModel.findById(pId)

    if (!targetedProduct)
      return res.json({ error: 'Invalid ID' })

    await ProductModel.findByIdAndDelete(pId)

    deleteImages(targetedProduct.pImages, 'string')

    res.json({ success: 'Product deleted successfully' })
  } catch (error) {
    res.json({ error })
  }
}

export const singleProduct = async (req, res) => {
  const { pId } = req.body

  if (!pId)
    return res.json({ error: 'All fields are required' })

  try {
    const singleProduct = await ProductModel.findById(pId).populate('pCategory', 'cName').populate('pRatingsReviews.user', 'name email userImage')

    res.json({ product: singleProduct })
  } catch (error) {
    res.json({ error })
  }
}


// @Desc  FETCH ALL PRODUCTS IN SAME CATEGORY
// Route  POST /api/product/product-by-category
export const productByCategory = async (req, res) => {
  const { catId } = req.body

  if (!catId) 
    return res.json({ error: 'All fields are required' })

  try {
    const products = await ProductModel.find({ pCategory: catId }).populate('pCategory', 'cName')

    res.json({ products })
  } catch (error) {
    res.json({ error });
  }
}

export const productByPrice = async (req, res) => {
  const { price } = req.body

  if (!price)
    return res.json({ error: 'All fields are required' })

  try {
    const products = await ProductModel.find({ pPrice: { $lt: price } }).populate('pCategory', 'cName').sort({ pPrice: -1 })

    res.json({ products })
  } catch (error) {
    return res.json({ error })
  }
}

export const wishProducts = async (req, res) => {
  const { productArray } = req.body

  if (!productArray.length)
      return res.json({ error: 'All fields are required' })

  try {
    const wishProducts = await ProductModel.find({ _id: { $in: productArray } })
    
    res.json({ Products: wishProducts })
  } catch (error) {
    return res.json({ error })
  }
}

export const cartProducts = async (req, res) => {
  const productsID = req.body

  if (!productsID.length)
    return res.json({ error: 'All fields are required' })

  try {
    const products = await ProductModel.find({ _id: { $in: productsID } })

    res.json({ products })
  } catch (error) {
    return res.json({ error })
  }
}

// @Desc  ADD REVIEW TO A SPECIFIC PRODUCT
// Route  POST /api/product/add-review
export const addProductReview = async (req, res) => {
  const { pId, uId, rating, review } = req.body

  if (!pId || !rating || !review || !uId)
    return res.json({ error: 'All fields are required' })

  try {
    const targetProduct = await ProductModel.findOne({ _id: pId })

    const isAlreadyReviewd = targetProduct.pRatingsReviews.some(review => review.user === uId)
    
    if (isAlreadyReviewd)
      return res.json({ error: 'You already reviewd the product' })

    const updatedProduct = await ProductModel
                                    .findByIdAndUpdate(
                                      pId,
                                      { $push: {
                                          pRatingsReviews: {
                                            review,
                                            user: uId,
                                            rating
                                          } 
                                        } 
                                      },
                                      { new: true }
                                    )
                                    .populate('pCategory', 'cName')
                                    .populate('pRatingsReviews.user', 'name email userImage')

    res.json({ success: 'Thank you for your review', product: updatedProduct })
  } catch (error) {
    res.json({ error })
  }
}

// @Desc  DELETE REVIEW TO A SPECIFIC PRODUCT
// Route  POST /api/product/delete-review
export const deleteReview = async (req, res) => {
  const { rId, pId } = req.body

  if (!rId || !pId)
    return res.json({ error: 'All fields are required' })

  try {
    const updatedProduct = await ProductModel
                                    .findByIdAndUpdate(
                                      pId,
                                      {
                                        $pull: { 
                                          pRatingsReviews: { _id: rId } 
                                        }
                                      },
                                      { new: true }
                                    )
                                    .populate('pCategory', 'cName')
                                    .populate('pRatingsReviews.user', 'name email userImage')

    res.json({ success: 'Your review is deleted', product: updatedProduct })
  } catch (error) {
    res.json({ error })
  }
}
import express from 'express'
import multer from 'multer'

import { fetchProducts, productByCategory, productByPrice, wishProducts, cartProducts, addProduct, editProduct, deleteProduct, singleProduct, addProductReview, deleteReview } from '../controller/products.js'

const router = express.Router()

// PRODUCT IMAGES UPLOAD SETTINGS
const destination = (req, file, cb) => { cb(null, './public/uploads/products') }
const filename = (req, file, cb) => { cb(null, `${Date.now()}_${file.originalname}`) }
const storage = multer.diskStorage({ destination, filename })
const upload = multer({ storage })

// PRODUCTS ROUTES @prefix /api/product
router.route('/all-product').get(fetchProducts)
router.route('/product-by-category').post(productByCategory)
router.route('/product-by-price').post(productByPrice)
router.route('/wish-product').post(wishProducts)
router.route('/cart-product').post(cartProducts)

// router.route('/add-product').post(addProduct)
router.route('/add-product').post(upload.any(), addProduct)
router.route('/edit-product').post(upload.any(), editProduct)
router.route('/delete-product').post(deleteProduct)
router.route('/single-product').post(singleProduct)

router.route('/add-review').post(addProductReview)
router.route('/delete-review').post(deleteReview)

export default router
import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })

API.interceptors.request.use((req) => {
    const token = JSON.parse(localStorage.getItem('jwt'))

    if (token) {
        req.headers.token = `Bearer ${token}`
    }

    return req
})

// AUTH API CALLS
export const signin = (userData) => API.post('/api/signin', userData)
export const signup = (userData) => API.post('/api/signup', userData)
export const currentUser = () => API.post('/api/current-user')
export const updateUser = (data) => API.post('/api/user/edit-user', data)

// CATEGORIES API CALLS
export const fetchCategories = () => API.get('/api/category/all-category')
export const singleCategory = (catId) => API.post('/api/category/single-category', { catId })
export const createCategory = (catData) => API.post('/api/category/add-category', catData)
export const editCategory = (catData) => API.post('/api/category/edit-category', catData)
export const deleteCategory = (cId) => API.post('/api/category/delete-category', { cId })

// PRODUCTS API CALLS
export const fetchProducts = () => API.get('/api/product/all-product')
export const fetchProductsByPrice = (price) => API.post('/api/product/product-by-price', { price })
export const cartProducts  = (products) => API.post('/api/product/cart-product', products)
export const singleProduct  = (id) => API.post('/api/product/single-product', { pId: id })
export const reviewProduct  = (reviewData) => API.post('/api/product/add-review', reviewData)
export const deleteProductReview  = (reviewData) => API.post('/api/product/delete-review', reviewData)
export const productsByCategory  = (catId) => API.post('/api/product/product-by-category', { catId })
export const createProduct  = (formData) => API.post('/api/product/add-product', formData)
export const deleteProduct  = (pId) => API.post('/api/product/delete-product', pId)
export const editProduct  = (formData) => API.post('/api/product/edit-product', formData)

// ORDERS API CALLS
export const fetchOrders = () => API.get('/api/order/get-all-orders')
export const createOrder = (order) => API.post('/api/order/create-order', order)
export const updateOrder = (data) => API.post('/api/order/update-order', data)
export const deleteOrder = (oId) => API.post('/api/order/delete-order', { oId })
export const orderByUser = (uId) => API.post('/api/order/order-by-user', { uId })

// CUSTOMIZE API CALLS
export const fetchSlider = () => API.get('/api/customize/get-slide-image')
export const dashboardData = () => API.post('/api/customize/dashboard-data')
export const uploadImage = (formData) => API.post('/api/customize/upload-slide-image', formData)
export const deleteImage = (id) => API.post('/api/customize/delete-slide-image', { id })
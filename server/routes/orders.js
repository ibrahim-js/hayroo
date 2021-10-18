import express from 'express'

import { fetchOrders, orderByUser, createOrder, updateOrder, deleteOrder } from '../controller/orders.js'

const router = express.Router()

router.route('/get-all-orders').get(fetchOrders)
router.route('/order-by-user').post(orderByUser)

router.route('/create-order').post(createOrder)
router.route('/update-order').post(updateOrder)
router.route('/delete-order').post(deleteOrder)

export default router
import OrderModel from '../models/orders.js'

export const fetchOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate('allProduct.id', 'pName pImages pPrice').populate('user', 'name email').sort({ _id: -1 })

    res.json({ orders })
  } catch (error) {
    res.json({ error })
  }
}

export const orderByUser = async (req, res) => {
  const { uId } = req.body

  if (!uId)
    return res.json({ error: 'All fields are required' })

  try {
    const order = await OrderModel.find({ user: uId }).populate('allProduct.id', 'pName pImages pPrice').populate('user', 'name email').sort({ _id: -1 })

    res.json({ order })
  } catch (error) {
    res.json({ error })
  }
}

export const createOrder = async (req, res) => {
  const { allProduct, user, fullname, address, city, phone } = req.body

  if (!allProduct || !user || !fullname || !city || !address || !phone)
    return res.json({ error: 'All fields are required' })

  try {
    const amount = allProduct.reduce((acc, prod) => acc + (prod.quantity * prod.price), 0)

    const newOrder = new OrderModel({ allProduct, user, amount, fullname, address, city, phone })

    await newOrder.save()

    res.json({ success: 'Thank you for your order' })
  } catch (error) {
    res.json({ error })
  }
}

export const updateOrder = async (req, res) => {
  const { oId, status } = req.body

  if (!oId || !status)
    return res.json({ error: 'All fields are required' })

  try {
    await OrderModel.findByIdAndUpdate(oId, { status, updatedAt: Date.now() })

    res.json({ success: 'Order updated successfully' })
  } catch (error) {
    res.json({ error })
  }
}

export const deleteOrder = async (req, res) => {
  const { oId } = req.body

  if (!oId)
    return res.json({ error: 'All fields are required' })

  try {
    await OrderModel.findByIdAndDelete(oId)

    res.json({ success: 'Order deleted successfully' })
  } catch (error) {
    res.json({ error })
  }
}
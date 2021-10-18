import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const orderSchema = new mongoose.Schema({
  allProduct: [
    {
      id: { type: ObjectId, ref: 'products' },
      price: Number,
      quantity: Number
    }
  ],
  user: {
    type: ObjectId,
    ref: "users",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "Not processed",
    enum: [
      "Not processed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ]
  },
}, { timestamps: true })

export default mongoose.model('orders', orderSchema)
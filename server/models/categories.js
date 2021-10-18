import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  cName: {
    type: String,
    required: true
  },
  cDescription: {
    type: String,
    required: true
  },
  cImage: {
    type: String
  },
  cStatus: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('categories', categorySchema)
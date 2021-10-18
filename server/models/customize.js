import mongoose from 'mongoose'

const customizeSchema = new mongoose.Schema({
  slideImage: {
    type: String
  },
  firstShow: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

export default mongoose.model('customizes', customizeSchema)
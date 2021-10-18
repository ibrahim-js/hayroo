import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
    match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  },
  password: {
    type: String,
    required: true
  },
  userRole: {
    type: Number,
    default: 0
  },
  phoneNumber: {
    type: Number
  },
  userImage: {
    type: String,
    default: 'user.png'
  },
  verified: {
    type: Boolean,
    default: false
  },
  secretKey: {
    type: String,
    default: null
  },
  history: {
    type: Array,
    default: []
  }
}, { timestamps: true })

export default mongoose.model('users', userSchema)
const mongoose = require('mongoose')

const NftSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: String,
  image: String,
  price: Number,
}, {
  timestamps: true
})

export const NftModel = (mongoose.models.Nft || mongoose.model('Nft', NftSchema));
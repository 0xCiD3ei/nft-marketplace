const mongoose = require('mongoose')

const NftSchema = new mongoose.Schema({
  name: {
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: String,
  image: String,
  price: String,
}, {
  timestamps: true
})

export const NftModel = (mongoose.models.Nft || mongoose.model('Nft', NftSchema));
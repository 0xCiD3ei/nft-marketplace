const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const NftSchema = new mongoose.Schema({
  metadata: {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    date: { type: Number, required: true },
    description: { type: String, required: true },
    id: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    uri: { type: String },
  },
  owner: String,
  supply: String,
  type: String,
  favorites: [
    {
      type: String
    }
  ]
}, {
  timestamps: true
});

NftSchema.plugin(mongoosePaginate);

export const NftModel = (mongoose.models.Nft || mongoose.model('Nft', NftSchema));
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: String,
  totalBalance: Number,
  totalItems: Number
}, {
  timestamps: true
})

export const CategoryModel = (mongoose.models.Category || mongoose.model('Category', CategorySchema));
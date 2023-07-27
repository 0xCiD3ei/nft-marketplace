import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    default: 'Unnamed'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  provider: {
    type: String,
    default: 'credentials'
  },
  avatar: String,
  followedIds : [
    {
      type: String
    }
  ]
})

export const UserModel = (mongoose.models.User || mongoose.model('User', UserSchema));


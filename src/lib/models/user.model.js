import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    default: 'Unnamed'
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bio: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  website: String,
  facebook: String,
  twitter: String,
  telegram: String,
  avatar: String,
  followedUsers : [
    {
      type: String
    }
  ]
})

export const UserModel = (mongoose.models.User || mongoose.model('User', UserSchema));


import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
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
  email: String,
  bio: {
    type: String,
    default: "Adventure seeker with a passion for exploring the world and capturing its beauty through photography"
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  website: String,
  facebook: String,
  twitter: String,
  telegram: String,
  avatar: {
    type: String,
    default: "https://nft-image.infura-ipfs.io/ipfs/QmZXrUr51eYns5ZGfEyaHYdMxrFGoUhvQydEkWp8oipeuw"
  },
  followedUsers : [
    {
      type: String
    }
  ]
})

let model;

try {
  model = mongoose.model("Account");
} catch (e) {
  model = mongoose.model("Account", AccountSchema);
}

export const AccountModel = model;


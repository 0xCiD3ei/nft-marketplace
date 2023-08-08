import mongoose from "mongoose";

const FavouriteSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  address:  [
    {
      type: String
    }
  ]
})

let model;

try {
  model = mongoose.model("Favourite");
} catch (e) {
  model = mongoose.model("Favourite", FavouriteSchema);
}

export const FavouriteModel = model;
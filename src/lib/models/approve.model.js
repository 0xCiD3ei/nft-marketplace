import mongoose from "mongoose";

const ApproveSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
})

let model;

try {
  model = mongoose.model("Approve");
} catch (e) {
  model = mongoose.model("Approve", ApproveSchema);
}

export const ApproveModel = model;

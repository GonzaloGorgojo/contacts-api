import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 3,
    maxLength: 15,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 3,
    maxLength: 15,
    trim: true,
  },
  address: { type: String, minLength: 4, maxLength: 50, required: true },
  number: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 20,
    unique: true,
  },
  status: { type: Number, default: 1 },
});

export default mongoose.model("reviews", ContactSchema);

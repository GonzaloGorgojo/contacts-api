import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  lastName: { type: String, required: true, lowercase: true, trim: true },
  address: { type: String, required: true },
  number: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 15,
    unique: true,
  },
  status: { type: Number, default: 1 },
});

export default mongoose.model("reviews", ContactSchema);

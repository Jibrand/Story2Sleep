import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  password: { type: String, required: true },
  account: String,
  time: { type: String, default: () => new Date().toLocaleTimeString() }, // Save time
  date: { type: String, default: () => new Date().toLocaleDateString() },  // Save date
  channelname: String,
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,   
  },});

export const user = mongoose.models.user || mongoose.model("user", userSchema);

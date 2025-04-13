// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["student", "faculty", "admin"], required: true },
//     institution: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model("User", UserSchema);
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["student", "faculty", "admin"],
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;

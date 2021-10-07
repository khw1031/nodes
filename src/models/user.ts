import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    requried: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password should not contain 'password'");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    // custom validation
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number.");
      }
    },
  },
});

export const User = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const zod = require("zod");
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(
  process.env.MONGODB_URL
  , { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    minLength: 5,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minLength: 3,
  },
  firstName: {
    type: String,
    trim: true,
    required:true,
    lowercase: true,
    minLength: 3,
    maxLength: 10,
    // unique:true
  },
  lastName: {
    type: String,
    trim: true,
    required:true,
    lowercase: true,
    minLength: 3,
    maxLength: 10,
    // unique:true
  },
});
const accountSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);


// console.log("hey")
module.exports = {
  User,Account
};

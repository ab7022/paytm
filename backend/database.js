const mongoose = require("mongoose");
const zod = require("zod");

mongoose.connect(
  "mongodb+srv://abdul:91oFy8etusfqQ3a5@cluster0.argigth.mongodb.net/paytm"
);

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

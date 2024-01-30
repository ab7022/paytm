const mongoose = require("mongoose");

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

const User = mongoose.model("User", userSchema);

// console.log("hey")
module.exports = User;

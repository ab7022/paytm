const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Account, User } = require("../database");
const { authMiddleware } = require("../middleware");


router.get("/dashboard", authMiddleware,async (req, res) => {
    try {
      const userId = req.userId;
  
      const user = await User.findById(userId);
  
      const account = await Account.findOne({
        userId,
      }); // Convert to plain JS object
  
      res.status(200).json({
        message: "Token is valid",
        user,
        account,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });

  module.exports= router
// /routes/account.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Account, User } = require("../database");
const { authMiddleware } = require("../middleware");

router.get("/balance",authMiddleware, async function (req, res) {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    }).populate("userId");

    if (!account) {
      return res.json({
        msg: "No account found for the user",
        balance: 0,
      });
    }

    const balance = account.amount;
    res.json({
      msg: "User found",
      balance: balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

router.post("/transfer", authMiddleware,async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    const senderAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );
      console.log(senderAccount);
      
    if (!senderAccount || senderAccount.amount < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid transfer amount",
      });
    }
    if(amount<=0 || amount ===undefined || amount===null){
      await session.abortTransaction();
      return res.status(400).json({
        message: "",
      });
    }
    
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { amount: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { amount: amount } }
    ).session(session);

    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Account, User } = require("../database");
const authMiddleware = require("../middleware");
const mongoose = require("mongoose");
router.get(
  "/balance",
  authMiddleware.authMiddleware,
  async function (req, res) {
    try {
      const account = await Account.find({
        userId: req.userId,
      }).populate("userId");

      if (!account || account.length === 0) {
        return res.json({
          msg: "No account found for the user",
          balance: 0,
        });
      }
      const balance = account[0].amount;
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
  }
);

router.post("/transfer", authMiddleware.authMiddleware, async (req, res) => {
  const { amount, receiver } = req.body;

  const senderAccount = await Account.findOne({
    userId: req.userId,
  });
  console.log("Sender Account:", senderAccount);
  if (!senderAccount || senderAccount.amount < amount) {
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const recipientUser = await User.findOne({
    username: receiver,
  });
  if (!recipientUser) {
    return res.status(400).json({
      message: "Recipient not found",
    });
  }

  const recipientAccount = await Account.findOne({
    userId: recipientUser._id,
  });
  console.log("recepient account is", recipientAccount);

  if (!recipientAccount) {
    return res.status(400).json({
      message: "Recipient account not found",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        amount: -amount,
      },
    }
  );

  await Account.updateOne(
    {
      userId: recipientUser._id,
    },
    {
      $inc: {
        amount: amount,
      },
    }
  );

  res.json({
    message: "Transfer successful",
  });
});

router.post("/transfer", authMiddleware.authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, receiver } = req.body;

  const senderAccount = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!senderAccount || senderAccount.amount < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const recipientUser = await Account.findOne({ username: receiver }).session(
    session
  );

  if (!recipientUser) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  const recipientAccount = await Account.findOne({
    userId: recipientUser._id,
  }).session(session);

  if (!recipientAccount) {
    await session.abortTransaction();

    return res.status(400).json({
      message: "Recipient account not found",
    });
  }
  console.log("Sender Account:", senderAccount);

  console.log("recepient account is", recipientAccount);
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { amount: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: recipientUser._id },
    { $inc: { amount: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;

const express = require("express");
const app = express();
const rootRouter = require("./routes/index");
const zod = require("zod");
const { User, Account } = require("./database");
const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
app.use(express.json());
const { authMiddleware } = require("./middleware");
const cors = require("cors");

app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// Other route handling goes here...
app.get("/", function (req, res) {
  res.json({
    msg: "it is working perfectly fine",
  });
});

app.use(rootRouter);
app.get("/dashboard", async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId); // Use the lean() method to convert Mongoose document to a plain JS object

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(4000 || PORT);

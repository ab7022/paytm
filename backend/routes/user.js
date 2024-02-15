// backend/routes/user.js
const express = require("express");
const router = express.Router();
const { User, Account } = require("../database");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { authMiddleware } = require("../middleware");
router.use(express.json());

router.post("/signup", async function (req, res) {
  const signupBody = zod.object({
    username: zod.string().email(),
    fName: zod.string(),
    lName: zod.string(),
    password: zod.string(),
  });

  const { success, data } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const { username, password, fName, lName } = data;

  if (!fName || !lName) {
    return res.status(411).json({
      message: "First name and last name are required",
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  const user = new User({
    username,
    password,
    firstName: fName,
    lastName: lName,
  });

  try {
    await user.save()
    const userId = user._id;

    await Account.create({
      userId: userId,
      amount: 1 + Math.floor(Math.random() * 1000),
    });

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.json({
      msg: "User Created Successfully",
      token: token,
    });
  } catch (error) {
    // Handle save error
    console.error(error);
    res.status(500).json({
      message: "Error while creating user",
    });
  }
});

router.post("/signin", async function (req, res) {
  try {

    const signinBody = zod.object({
      username: zod.string().email(),
      password: zod.string(),
    });
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Wrong password or Incorrect inputs",
      });
    }
    console.log("Query parameters:", {
      username: req.body.username,
      password: req.body.password,
    });

    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });


    console.log(user);
    if (user) {
      const userId = user._id;
      const token = jwt.sign(
        {
          userId,
        },
        JWT_SECRET
      );
      res.json({
        token: token,
        msg: "success",
      });
      return;
    }else {
      console.log("User not found");
      res.status(401).json({
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(411).json({
      message: "Error while logging in",
      error:error.message
    });
  }
});

const updateBody = zod.object({
  username: zod.string().optional(),
  password: zod.string().optional(),
  fName: zod.string().optional(),
  lName: zod.string().optional(),
});

router.put("/update", async (req, res) => {
  const { success, data: updateData } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  try {
    // Construct the update object
    const updateObject = {};
    if (updateData.fName) {
      updateObject.firstName = updateData.fName;
    }
    if (updateData.lName) {
      updateObject.lastName = updateData.lName;
    }
    if (updateData.username) {
      updateObject.username = updateData.username;
    }
    if (updateData.password) {
      updateObject.password = updateData.password;
    }

    // Use findByIdAndUpdate to update user by ID and only update specified fields
    await User.findByIdAndUpdate(req.userId, updateObject);

    res.json({
      message: "Updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while updating information",
    });
  }
});

router.get("/bulk",authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;

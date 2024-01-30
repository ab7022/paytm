const express = require("express")
const router = express.Router()
const userRouter = require("./user")
const account = require("./account")

// router.use("/user",userRouter)
// router.use("/account",account)
router.use("/user",userRouter)
router.use("/account",account)


module.exports = router
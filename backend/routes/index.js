const express = require("express")
const router = express.Router()
const userRouter = require("./user")
const account = require("./account")
const dashboard = require("./dashboard")

const authMiddleware  = require("../middleware")


// router.use("/user",userRouter)
// router.use("/account",account)
router.get("/",function(req,res){
    res.json({
        msg:"it is working perfectly fine"
    })
})
router.use(userRouter)
router.use(account)
router.use(dashboard)

module.exports = router
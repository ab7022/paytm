const express = require("express")
const router = express.Router()
const userRouter = require("./user")
const account = require("./account")
const dashboard = require("./dasboard")

const authMiddleware  = require("../middleware")
const cors = require("cors")

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
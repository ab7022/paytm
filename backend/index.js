const express = require("express");
const app = express()
const rootRouter = require("./routes/index")
const cors = require("cors")
const zod = require("zod")
const {User,Account} = require("./database");
const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
app.use(express.json())
app.use(cors())
// app.use("api/v1",rootRouter)
app.use(rootRouter)

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
app.listen(3000)


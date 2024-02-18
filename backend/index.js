const express = require("express");
const app = express();
const rootRouter = require("./routes/index");
app.use(express.json());
const cors = require("cors");

app.use(cors());
app.get("/", function (req, res) {
  res.json({
    msg: "it is working perfectly fine",
  });
});

app.use(rootRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});


app.listen(4000, () => {
  console.log(`Server is running on port`);
});
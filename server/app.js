const express = require("express");
const router = require("./routes");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`server run on http://localhost:${port}/`);
});

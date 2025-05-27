var cors = require("cors");
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

const itemsAction = require('./action/Items');
const userAction= require("./action/users");
const app = express();
const port = process.env.PORT ;


app.use(express.json());
app.use(cors());
app.get("/", async function (req, res) {
  res.json({ Message: "not here" });
});

app.use(itemsAction);
app.use(userAction);



app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});

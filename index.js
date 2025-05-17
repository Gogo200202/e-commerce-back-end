var cors = require("cors");
const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

const { GetAllItems, GetItemById } = require("./database/ItemsQuery");

app.get("/", async function (req, res) {
  res.json({ Message: "not here" });
});

app.get("/getAllItems", async function (req, res, next) {
  let allItems = await GetAllItems();

  res.json({ Items: allItems });
});

app.post("/getById", async function (req, res) {
  console.log(req.body);

  let id = req.body._id;

  let item = await GetItemById(id);

  res.json({ item });
});

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});

var cors = require("cors");
const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

const {
  GetAllItems,
  GetItemById,
  GetItemsByName,
} = require("./database/ItemsQuery");

app.get("/", async function (req, res) {
  res.json({ Message: "not here" });
});

app.get("/getAllItems", async function (req, res, next) {
  let allItems = await GetAllItems();

  res.json({ Items: allItems });
});

app.post("/getById", async function (req, res) {
  let id = req.body._id;

  let item = await GetItemById(id);

  res.json({ item });
});

app.post("/getByName", async function (req, res) {
  let name = req.body.name;

  let items = await GetItemsByName(name);
  
  res.json({ items: items });
});

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});

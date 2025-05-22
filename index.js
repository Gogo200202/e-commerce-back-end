var cors = require("cors");
const express = require("express");
const crypto = require("crypto");

const app = express();
const port = 8080;

let multer = require("multer");

app.use(express.json());
app.use(cors());

const {
  GetAllItems,
  GetItemById,
  GetItemsByName,
} = require("./database/ItemsQuery");
const { addItems } = require("./database/Items");

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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imgHost/public/images"); // your path
  },
  filename: function (req, file, cb) {
    const uuid = crypto.randomBytes(16).toString("hex");
    let type = "";

    if (file.mimetype == "image/jpeg") {
      type = "jpg";
    }
    req.uuid = uuid;
    req.type = type;
    cb(null, uuid + "." + type);
  },
});

var upload = multer({ storage: storage });
function AddImgToDb(req, res, next) {
  let PhatToImg = "http://localhost:5353/images/" + req.uuid + "." + req.type;
  let body = req.body;

  let item = {
    img: PhatToImg,
    name: body.Name,
    description: body.Description,
    phone: body.PhoneNumber,
  };
  addItems(item);
  next();
  
}

app.post(
  "/addItem",
  upload.single("file"),
  AddImgToDb,
  async function (req, res) {
  res.status(201).send({status: "recieved"}); 
  }
);

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});

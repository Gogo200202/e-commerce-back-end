const crypto = require("crypto");
const { validateTokenMiddleware } = require("../middleware/jwt");
const { Router } = require("express");

const router = Router();

let multer = require("multer");

const {
  GetAllItems,
  Get6ofMostLikedItems,
  GetItemById,
  getItemsByParams,
} = require("../database/ItemsQuery");
const { addItems } = require("../database/ItemsQuery");
const { addProductToUserPublished } = require("../database/user");

router.get("/getMostLikedItems", async function (req, res, next) {
  let allItems = await Get6ofMostLikedItems();

  res.json({ Items: allItems });
});

router.post("/getById", async function (req, res) {
  let id = req.body._id;


  let item = await GetItemById(id);

  res.json({ item });
});

router.post("/getItemsByParams", async function (req, res) {
  let body = req.body;

  let items = await getItemsByParams(body);

  res.json({ items: items });
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imgHost/public/images"); 
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

let upload = multer({ storage: storage });

async function AddImgToDb(req, res, next) {
  let PhatToImg = "http://localhost:5353/images/" + req.uuid + "." + req.type;
  let body = req.body;

  let item = {
    img: PhatToImg,
    name: body.Name,
    description: body.Description,
    phone: body.PhoneNumber,
    price: body.Price,
    category:body.Category,
    location:body.Location,
    totalLikes:0
  };

  if (res.locals.jwtValid) {
    res.status(200);
    let newItem = await addItems(item);

    await addProductToUserPublished(res.locals.userData.userName, newItem.insertedId.toHexString());
  }

  next();
}

router.post(
  "/addItem",
  upload.single("file"),
  [validateTokenMiddleware, AddImgToDb],
  async function (req, res) {
    res.status(200).send({ status: "recieved" });
  }
);

module.exports = router;

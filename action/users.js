const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { Router, request } = require("express");

const {
  CreateUser,
  fiendByUserName,
  getProductsFromUser,
} = require("../database/user");
const { generateTokenFunction } = require("../utils/jwt");
const { hashPassword, checkPassword } = require("../utils/hashPasswords");
const { validateTokenMiddleware } = require("../middleware/jwt");
const { validateTokenFunction } = require("../utils/jwt");
const { deleteItemById } = require("../database/ItemsQuery");
const { checkIfItemBelongsToUser } = require("../utils/user");

const router = Router();

const bcrypt = require("bcrypt");

router.post("/user/CreateUser", async (req, res) => {
  let body = req.body;
  let hashedPassword = await hashPassword(body["password"]);
  body["password"] = hashedPassword;

  let user = await fiendByUserName(body.userName);

  if (user == null) {
    let newUser = await CreateUser(body);
    let jwt = generateTokenFunction(body["userName"], newUser.insertedId);
    res.status(200).json({ Jwt: jwt });
  } else {
    res.status(401).json({ Message: "This user name is already taken" });
  }
});

router.post("/user/login", async (req, res) => {
  let body = req.body;
  let user = await fiendByUserName(body.userName);
  if (user != null) {
    if (await checkPassword(body["password"], user.password)) {
      let jwt = generateTokenFunction(body["userName"], user.insertedId);
      res.status(200).json({ Jwt: jwt });
    } else {
      res.status(401).json({ Message: "not valid password or user name" });
    }
  } else {
    res.status(401).json({ Message: "not valid password or user name" });
  }
});

router.get("/user/getItems", validateTokenMiddleware, async (req, res) => {
  if (res.locals.jwtValid) {
    let items = await getProductsFromUser(res.locals.userData.userName);

    res.json(items);
  } else {
    res.json({ message: "not validToken" });
  }
});

router.post("/user/checkIfItemBelongsToUser", async (req, res) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  const token = req.header(tokenHeaderKey);
  let body = req.body;
  let id = body["_id"];
  let result = await checkIfItemBelongsToUser(token, id);

  if (result) {
    res.status(200).json({ IsYours: result });
  } else {
    res.status(401).json({ message: "not logged in" });
  }
});

router.post("/user/deleteItem", validateTokenMiddleware, async (req, res) => {
  let id = req.body["_id"];

  if (res.locals.jwtValid) {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const token = req.header(tokenHeaderKey);

    let result = await checkIfItemBelongsToUser(token, id);
    console.log(id);
    if (result) {
      let item = deleteItemById(id);
      res.json({ massage: "Item deleted" });
    } else {
      res.json({ message: "not user" });
    }
  } else {
    res.json({ message: "not validToken" });
  }
});
module.exports = router;

const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { Router, request } = require("express");
const { validateTokenMiddleware } = require("../middleware/jwt");
const { CreateUser } = require("../database/user");
const { generateTokenFunction } = require("../utils/jwt");
const { hashPassword, checkPassword } = require("../utils/hashPasswords");

const router = Router();

const bcrypt = require("bcrypt");

router.post("/user/CreateUser", async (req, res) => {
  let body = req.body;

  let hashedPassword = await hashPassword(body["password"]);
  body["password"] = hashedPassword;
   let newUser = await CreateUser(body);
 
  let jwt = generateTokenFunction(body["userName"], newUser.insertedId);
  res.json({ "Jwt": jwt });
});

router.post("/user/login", validateTokenMiddleware, (req, res) => {
  if (res.locals.jwtValid) {
    res.json({ User: "login" });
  } else {
    res.json({ User: "not login" });
  }
});

module.exports = router;

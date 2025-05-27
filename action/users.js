const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const {
  generateTokenMiddleware,
  validateTokenMiddleware,
} = require("../middleware/jwt");

const router = Router();

router.post("/user/CreateUser", generateTokenMiddleware, (req, res) => {
  res.json({ User: "Create", Jwt: res.locals.jwt });
});

router.post("/user/login", validateTokenMiddleware, (req, res) => {

  if (res.locals.jwtValid) {
    res.json({ User: "login" });
  } else {
    res.json({ User: "not login" });
  }
});

module.exports = router;

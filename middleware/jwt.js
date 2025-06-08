const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { Router } = require("express");

function generateTokenMiddleware(req, res, next) {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
  };

  const token = jwt.sign(data, jwtSecretKey);
  res.locals.jwt = token;
  next();
}

function validateTokenMiddleware(req, res, next) {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  res.locals.jwtValid = true;
  try {
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
      res.locals.jwtValid = true;
      res.locals.userData = verified;
    } else {
      // Access Denied
      res.locals.jwtValid = false;
    }
  } catch (error) {
    // Access Denied
    res.locals.jwtValid = false;
  }
  next();
}

module.exports = { generateTokenMiddleware, validateTokenMiddleware };

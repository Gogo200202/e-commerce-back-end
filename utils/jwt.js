const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { Router } = require("express");

function generateTokenFunction(userName, userId) {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: userId,
  };

  const token = jwt.sign(data, jwtSecretKey);
  return token;
}

function validateTokenFunction(token) {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return true;
    } else {
      // Access Denied
      return false;
    }
  } catch (error) {
    // Access Denied
    return false;
  }
}
module.exports = { generateTokenFunction, validateTokenFunction };

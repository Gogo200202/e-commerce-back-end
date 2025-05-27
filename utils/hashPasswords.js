const crypto = require("crypto");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
}

async function checkPassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);

  return match;
}

module.exports = { hashPassword, checkPassword };

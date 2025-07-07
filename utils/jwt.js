const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");


function generateTokenFunction(userName, userId) {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: userId,
    userName:userName
  };

  const token = jwt.sign(data, jwtSecretKey);
  return token;
}

function validateTokenFunction(token) {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    
   return verified;
  } catch (error) {
 
    return false;
  }
}
module.exports = { generateTokenFunction, validateTokenFunction };

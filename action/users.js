const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { Router, request } = require("express");

const { CreateUser, fiendByUserName,getProductsFromUser } = require("../database/user");
const { generateTokenFunction } = require("../utils/jwt");
const { hashPassword, checkPassword } = require("../utils/hashPasswords");
const{validateTokenMiddleware} =require("../middleware/jwt")

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

router.get("/user/getItems",validateTokenMiddleware, async (req, res) => {
  if(res.locals.jwtValid){
 let items= await getProductsFromUser(res.locals.userData.userName)

 res.json(items)
  }else{
     res.json({"message":"not validToken"})
  }
 

});

module.exports = router;

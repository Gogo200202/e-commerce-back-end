

const { Db } = require("./connectionDb");

var ObjectID = require("mongodb").ObjectID;
var mongo = require("mongodb");

async function CreateUser(newUser) {
  let DbConnection = await Db;
  let newUserObject={
    userName:newUser.userName,
    password:newUser.password,
    email:newUser.email,
    likedProducts:[],
    publishedProducts:[]
  }

  const user = await DbConnection.Users.insertOne(newUserObject);

  return user;
}


async function fiendByUserName(userName) {
  let DbConnection = await Db;

  const user = await DbConnection.Users.findOne({"userName":userName});

  return user;
}

module.exports = { CreateUser,fiendByUserName };

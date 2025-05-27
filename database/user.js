const { Db } = require("./connectionDb");

var ObjectID = require("mongodb").ObjectID;
var mongo = require("mongodb");

async function CreateUser(newUser) {
  let DbConnection = await Db;

  const user = await DbConnection.Users.insertOne(newUser);

  return user;
}

module.exports = { CreateUser };

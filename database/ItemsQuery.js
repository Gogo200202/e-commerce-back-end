const { Db } = require("./connectionDb");

var ObjectID = require("mongodb").ObjectID;
var mongo = require("mongodb");

async function GetAllItems() {
  let DbConnection = await Db;

  const Items = await DbConnection.Items.find().toArray();

  return Items;
}

async function GetItemById(id) {
  let DbConnection = await Db;

  const Item = await DbConnection.Items.findOne({
    _id: new mongo.ObjectId(id),
  });

  return Item;
}

async function GetItemsByName(name) {
  let DbConnection = await Db;

  let obj = {
    name: new RegExp(name, "i"),
  };


  const Items = await DbConnection.Items.find(obj).toArray();

  return Items;
}

module.exports = { GetAllItems, GetItemById, GetItemsByName };

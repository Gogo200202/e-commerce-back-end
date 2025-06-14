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

async function deleteItemById(id) {
  let DbConnection = await Db;

  const filter = {
    _id: new mongo.ObjectId(id),
  };

  const Items = await DbConnection.Items.deleteOne(filter);

  return Items;
}

async function addItems(item) {
  let DbConnection = await Db;

  const Items = await DbConnection.Items.insertOne(item);

  return Items;
}
module.exports = {
  GetAllItems,
  GetItemById,
  GetItemsByName,
  deleteItemById,
  addItems,
};

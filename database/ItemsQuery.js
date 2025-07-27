const { Db } = require("./connectionDb");

var ObjectID = require("mongodb").ObjectID;
var mongo = require("mongodb");

async function Get6ofMostLikedItems() {
  let DbConnection = await Db;

  const filter = {};
  const sort = {
    totalLikes: -1,
  };
  const limit = 6;

  const Items = await DbConnection.Items.find(filter, { sort, limit }).toArray();

  return Items;
}
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

async function getItemsByParams(body) {
  let DbConnection = await Db;

  const filter = {};
  if (body.nameOfProduct != "") {
    filter.name = new RegExp(body.nameOfProduct, "i");
  }
  if (body.itemCategory != "") {
    filter.category = body.itemCategory;
  }
  if (body.itemLocation != "") {
    filter.location = body.itemLocation;
  }

  const Items = await DbConnection.Items.find(filter).toArray();

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
  getItemsByParams,
  deleteItemById,
  addItems,
  Get6ofMostLikedItems
};

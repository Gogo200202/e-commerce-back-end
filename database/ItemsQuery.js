const { Db } = require("./connectionDb");

var ObjectID = require('mongodb').ObjectID;
var mongo = require('mongodb');


async function GetAllItems() {
  let DbConnection = await Db;

  let Items = await DbConnection.Items.find().toArray();

   return Items;
}


async function GetItemById(id) {
  let DbConnection = await Db;


  let Item = await DbConnection.Items.findOne({_id:new mongo.ObjectId(id)});
    console.log(Item)
   return Item;
}


module.exports = { GetAllItems, GetItemById}

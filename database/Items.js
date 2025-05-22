const { Db } = require("./connectionDb");

var ObjectID = require("mongodb").ObjectID;
var mongo = require("mongodb");

async function addItems(item) {

    let DbConnection = await Db;

  const Items = await DbConnection.Items.insertOne(item)

  return Items;
    
}

module.exports = { addItems};
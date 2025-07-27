const { Db } = require("./connectionDb");

var ObjectID = require("mongodb").ObjectId;
var mongo = require("mongodb");

async function CreateUser(newUser) {
  let DbConnection = await Db;
  let newUserObject = {
    userName: newUser.userName,
    password: newUser.password,
    email: newUser.email,
    likedProducts: [],
    publishedProducts: [],
  };

  const user = await DbConnection.Users.insertOne(newUserObject);

  return user;
}

async function addProductToUserPublished(userName, productId) {
  let DbConnection = await Db;

  const user = await DbConnection.Users.updateOne(
    { userName: userName },
    { $push: { publishedProducts: productId } }
  );

  return user;
}

async function getProductsFromUser(userName) {
  let DbConnection = await Db;

  const filter = {
    userName: userName,
  };
  const projection = {
    publishedProducts: 1,
    _id: 0,
  };
  const userItems = await DbConnection.Users.findOne(filter, { projection });

  return userItems;
}

async function fiendByUserName(userName) {
  let DbConnection = await Db;

  const user = await DbConnection.Users.findOne({ userName: userName });

  return user;
}

async function deleteProductIdFromUser(userName, productId) {
  let DbConnection = await Db;

  const user = await DbConnection.Users.updateOne(
    { userName: userName },
    { $pull: { publishedProducts: productId } }
  );

  return user;
}

async function checkIfItemBelowsToUser(userName, productId) {
  let DbConnection = await Db;

  const user = await DbConnection.Users.find({
    userName: userName,
    publishedProducts: { $in: [productId] },
  }).count();

  return user;
}
async function checkIfItemIsLikedByUser(userName, productId) {
  let DbConnection = await Db;

  const user = await DbConnection.Users.find({
    userName: userName,
    likedProducts: { $in: [productId] },
  }).count();

  return user;
}

async function deleteLikedProductIdFromUser(userName, productId) {
  let DbConnection = await Db;

   let filter = { _id: new ObjectID(productId) };
  await DbConnection.Items.updateOne(filter, {
    $inc: { totalLikes: -1 },
  });
  const user = await DbConnection.Users.updateOne(
    { userName: userName },
    { $pull: { likedProducts: productId } }
  );

  return user;
}

async function addProductLikesToUser(userName, productId) {
  let DbConnection = await Db;
  let filter = { _id: new ObjectID(productId) };
  await DbConnection.Items.updateOne(filter, {
    $inc: { totalLikes: 1 },
  });

  const user = await DbConnection.Users.updateOne(
    { userName: userName },
    { $push: { likedProducts: productId } }
  );

  return user;
}
async function getLikedProductsFromUser(userName) {
  let DbConnection = await Db;

  const filter = {
    userName: userName,
  };
  const projection = {
    likedProducts: 1,
    _id: 0,
  };
  const userItems = await DbConnection.Users.findOne(filter, { projection });

  return userItems;
}

module.exports = {
  CreateUser,
  fiendByUserName,
  addProductToUserPublished,
  getProductsFromUser,
  addProductLikesToUser,
  deleteProductIdFromUser,
  deleteLikedProductIdFromUser,
  checkIfItemBelowsToUser,
  checkIfItemIsLikedByUser,
  getLikedProductsFromUser,
};

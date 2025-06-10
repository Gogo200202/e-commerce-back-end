const { validateTokenFunction } = require("./jwt");
const {
  checkIfItemBelowsToUser,
  checkIfItemIsLikedByUser,
} = require("../database/user");

async function checkIfItemBelongsToUser(token, id) {
  let getUser = validateTokenFunction(token);
  let result = false;
  if (getUser) {
    let isThisTheOwner = await checkIfItemBelowsToUser(getUser.userName, id);
    if (isThisTheOwner == 1) {
      result = true;
    } else {
      result = false;
    }
  } else {
    result = false;
  }

  return result;
}

async function checkIfItemIsLedByUser(token, id) {
  let getUser = validateTokenFunction(token);
  let result = false;
  if (getUser) {
    let isThisTheOwner = await checkIfItemIsLikedByUser(getUser.userName, id);

    if (isThisTheOwner == 1) {
      result = true;
    } else {
      result = false;
    }
  } else {
    result = false;
  }

  return result;
}
module.exports = { checkIfItemBelongsToUser, checkIfItemIsLedByUser };

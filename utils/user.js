const { validateTokenFunction } = require("./jwt");
const { getProductsFromUser } = require("../database/user");

async function checkIfItemBelongsToUser(token, id) {
  let getUser = validateTokenFunction(token);
  let result = false;
  if (getUser) {
    let getUserItems = await getProductsFromUser(getUser.userName);

    for (
      let index = 0;
      index < getUserItems.publishedProducts.length;
      index++
    ) {
      if (getUserItems.publishedProducts[index] == id) {
        result = true;
        break;
      }
    }
  } else {
    result = false;
  }

  return result;
}
module.exports = { checkIfItemBelongsToUser };

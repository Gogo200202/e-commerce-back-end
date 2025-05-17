const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { connectTimeoutMS: 30000 }, { keepAlive: 1});
async function startDb() {
  
    const database =  client.db('eCommerceDb');
    const Items =   database.collection('Items');
    let object={
        "db":database,
        "Items":Items
    }
   
    return object;
  
}


let Db =startDb();

module.exports = { Db }
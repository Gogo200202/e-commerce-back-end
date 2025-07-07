const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { connectTimeoutMS: 30000 }, { keepAlive: 1});
async function startDb() {
  
    const database =  client.db('eCommerceDb');
    const Items =   database.collection('Items');
    const Users= database.collection('Users');
    let object={
        "db":database,
        "Items":Items,
        "Users":Users
    }
   
    return object;
  
}


let Db =startDb();

module.exports = { Db }
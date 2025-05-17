const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('Test');
    const movies =  database.collection('User');
    // Queries for a movie that has a title value of 'Back to the Future'

    const movie = await movies.find({}).toArray();
    console.log(movie);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
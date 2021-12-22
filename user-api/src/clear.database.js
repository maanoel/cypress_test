const { MongoClient } = require("mongodb");
const UserRepository = require("./user-repository.js");

(async () => {
  const uri =
    "mongodb+srv://vitor2908:33516568@clusterinicial.ga1at.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  await client.connect();
  const collection = client.db("users_db").collection("users");
  const userRepository = new UserRepository(collection);
  await userRepository.deleteAll();
  await client.close();
  console.log("Database cleared");
})();

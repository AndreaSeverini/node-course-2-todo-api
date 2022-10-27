/**
 * Setting up the MongoClient to interact with the db
 */
const MongoClient = require("mongodb").MongoClient;

// - connecting to the db
const addTodo = (text, completed = false) =>
  MongoClient.connect(
    "mongodb://localhost:20018/TodosApp",
    { useNewUrlParser: true },
    async (err, client) => {
      if (err) {
        return console.log("** WARN ** - Unable to connect to MongoDB Server");
      }
      console.log("** CONNECTED to MongoDB Server ** ");
      const db = client.db("TodoApp");

      const payload = { text, completed };
      //Insert new doc into todos collection
      const res = await db.collection("Todos").insertOne(payload);
      if (res) {
        console.log(JSON.stringify({ res }, undefined, 2));
      } else {
        return console.log("* Unable to insert new Todo * - ");
      }
      client.close();
    }
  );

const addUser = (name, age = "unknown", location = "unknown") =>
  MongoClient.connect(
    "mongodb://localhost:20018/TodosApp",
    { useNewUrlParser: true },
    async (err, client) => {
      if (err) {
        return console.log("** WARN ** - Unable to connect to MongoDB Server");
      }
      console.log("** CONNECTED to MongoDB Server ** ");
      const db = client.db("TodoApp");

      const payload = { name, age, location };
      //Insert new doc into users collection
      const res = await db.collection("Users").insertOne(payload);
      if (res) {
        console.log(JSON.stringify({ res }, undefined, 2));
      } else {
        return console.log("* Unable to insert new User * - ");
      }
      client.close();
    }
  );

//addUser("Andrea", "28", "Milano");
addTodo("Learn Node.js and MondoDB - part 1", true);

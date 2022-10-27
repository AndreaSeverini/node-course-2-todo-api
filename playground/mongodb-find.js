/**
 * Setting up the MongoClient to interact with the db
 */
const { MongoClient, ObjectId } = require("mongodb");

// - connecting to the db
const fetchTodos = (id = undefined, completed = undefined) =>
  MongoClient.connect(
    "mongodb://localhost:20018/TodosApp",
    { useNewUrlParser: true },
    async (err, client) => {
      if (err) {
        return console.log("** WARN ** - Unable to connect to MongoDB Server");
      }
      console.log("** CONNECTED to MongoDB Server ** ");
      const db = client.db("TodoApp");

      //Insert new doc into todos collection
      if (completed === undefined && id === undefined) {
        const res = await db.collection("Todos").find().toArray();
        if (res) {
          console.log({ title: "----TODOS----" });
          console.log(JSON.stringify({ res }, undefined, 2));
        } else {
          return console.log("* Unable to fetch Todos * - ");
        }
      } else if (completed === undefined && id !== undefined) {
        const res = await db
          .collection("Todos")
          .find({ _id: new ObjectId(id) })
          .toArray();
        if (res) {
          console.log({ title: `----TODO: id = ${id}----` });
          console.log(JSON.stringify({ res }, undefined, 2));
        } else {
          return console.log(
            `* Unable to fetch Todos * - completed = ${completed}`
          );
        }
      } else if (completed === true || completed === false) {
        const query = id
          ? { completed: completed, _id: new ObjectId(id) }
          : { completed: completed };
        const res = await db.collection("Todos").find(query).toArray();

        if (res) {
          console.log({
            title: `----TODOs: completed : ${query.completed} | id: ${query._id}----`,
          });
          console.log(JSON.stringify({ res }, undefined, 2));
        } else {
          return console.log(
            `* Unable to fetch Todos * - completed = ${completed}`
          );
        }
      }
      //client.close();
    }
  );

const count = (collectionName) =>
  MongoClient.connect(
    "mongodb://localhost:20018/TodosApp",
    { useNewUrlParser: true },
    async (err, client) => {
      if (err) {
        return console.log("** WARN ** - Unable to connect to MongoDB Server");
      }
      console.log("** CONNECTED to MongoDB Server ** ");
      const db = client.db("TodoApp");

      const res = await db.collection(`${collectionName}`).countDocuments();
      if (res) {
        console.log({ title: `----${collectionName}' COUNT----` });
        console.log(JSON.stringify({ res }, undefined, 2));
      } else {
        return console.log(`* Unable to count ${collectionName} * - `);
      }

      //client.close();
    }
  );

// fetchTodos();
// fetchTodos(undefined, true);
// fetchTodos(undefined, false);
// fetchTodos("6353d39a196e292eeba9fa93");
// fetchTodos("6353d39a196e292eeba9fa93", false);
count("Todos");
count("noexistingcollection");
count("Users");

/**
 * Setting up the MongoClient to interact with the db
 */
const { MongoClient, ObjectId } = require("mongodb");

// - connecting to the db
const updateTodoCompleted = (text) =>
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
      if (text) {
        const res = await db.collection("Todos").findOneAndUpdate(
          { text },
          {
            $set: {
              completed: true,
            },
          },
          {
            returnDocument: "after",
          }
        ); //deleteMany same without output
        if (res) {
          console.log({ title: "----TODO UPDATED----" });
          console.log(JSON.stringify({ res }, undefined, 2));
        } else {
          return console.log("* Unable to update Todo * - ");
        }
      }
      //client.close();
    }
  );

updateTodoCompleted("Something to do");

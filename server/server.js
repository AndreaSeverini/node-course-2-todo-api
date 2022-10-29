const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const { ObjectId } = require("mongodb");

//Express Application initialization
const app = express();

app.listen(3000, () => {
  console.log("Express Application started on port 3000");
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    (todos) => {
      res.send({ todos });
    },
    (e) => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(400).send({});
    return console.log("The Id is not a valid one.");
  }
  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        res.status(404).send({});
        return console.log("The Id is not present.");
      }
      res.send({ todo });
      return console.log("The Id is correctly send back.");
    })
    .catch((e) => {
      res.status(400).send(e);
      return;
    });
});

//To send JSON to the application
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save().then(
    (doc) => {
      res.send(doc);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
});

module.exports = { app };

// const newTodo = new Todo({
//   text: "Cook dinner",
// });

// const otherTodo = new Todo({
//   text: "Feed the cat",
//   completed: true,
//   completedAt: 123,
// });

//Calling a method to update the database
// otherTodo.save().then(
//   (doc) => {
//     console.log("------THE DOCUMENT HAS BEEN SAVED------");
//     console.log(JSON.stringify(doc, undefined, 2));
//   },
//   (e) => {
//     console.log("------UNABLE TO SAVE TODO------");
//     console.log(e);
//   }
// );

// const failingTodo = new Todo({});
// failingTodo.save().then(
//   (doc) => {
//     console.log("------THE DOCUMENT HAS BEEN SAVED------");
//     console.log(JSON.stringify(doc, undefined, 2));
//   },
//   (e) => {
//     console.log("------UNABLE TO SAVE TODO------");
//     console.log(e);
//   }
// );

// const newUserNoEmail = new User({});
// const newUser = new User({
//   email: "andreaseverini94@gmail.com",
// });

// newUserNoEmail.save().then(
//   (user) => {
//     console.log("------THE USER HAS BEEN CREATED------");
//     console.log(JSON.stringify(user, undefined, 2));
//   },
//   (e) => {
//     console.log("------UNABLE TO CREATE USER------");
//     console.log(e);
//   }
// );

// newUser.save().then(
//   (user) => {
//     console.log("------THE USER HAS BEEN CREATED------");
//     console.log(JSON.stringify(user, undefined, 2));
//   },
//   (e) => {
//     console.log("------UNABLE TO CREATE USER------");
//     console.log(e);
//   }
// );

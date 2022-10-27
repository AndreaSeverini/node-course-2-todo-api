const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

//Express Application initialization
const app = express();

app.listen(3000, () => {
  console.log("Express Application started on port 3000");
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

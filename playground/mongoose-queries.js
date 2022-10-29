const { ObjectId } = require("mongodb");
const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

const id = "635ab3ca73fe3bd27f3f2f56";
const wrongId = "635ab3ca73fe3bd27f3f2f58";
const userId = "635a9803b8b8c0baeb29889b";

// Todo.find({
//   _id: id,
// }).then((todos) => {
//   console.log("Todos", todos);
// });

// Todo.findOne({
//   _id: id,
// }).then((todo) => {
//   console.log("Todo", todo);
// });

Todo.findById(id).then((todo) => {
  if (!ObjectId.isValid(id)) {
    return console.log("Id not valid");
  }
  if (!todo) {
    return console.log("Id not found.");
  }
  console.log("Todo by Id: id --->", todo);
});

Todo.findById(wrongId).then((todo) => {
  if (!ObjectId.isValid(wrongId)) {
    return console.log("Id not valid.");
  }
  if (!todo) {
    return console.log("Id not found.");
  }
  console.log("Todo by Id: --->", wrongId, todo);
});

Todo.findById("67890sfhy768").then((todo) => {
  if (!ObjectId.isValid("67890")) {
    return console.log("Id not valid");
  }
  if (!todo) {
    return console.log("Id not found.");
  }
  console.log("Todo by Id: --->", "67890", todo);
});

User.findById(userId).then(
  (user) => {
    if (!user) {
      return console.log("Unable to find user.");
    }
    console.log(JSON.stringify(user, undefined, 2));
  },
  (e) => {
    console.log(e);
  }
);

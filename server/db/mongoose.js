const mongoose = require("mongoose");
// import { mongoose } from "mongoose";
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:20018/TodoApp");

module.exports = {
  mongoose,
};

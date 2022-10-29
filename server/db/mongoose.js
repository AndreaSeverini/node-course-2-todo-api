const mongoose = require("mongoose");
// import { mongoose } from "mongoose";
mongoose.Promise = global.Promise;
const mongoUrl =
  "mongodb+srv://Daedevils:1234567894@todos.ezvto8e.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl);

module.exports = {
  mongoose,
};

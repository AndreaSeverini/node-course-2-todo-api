const mongoose = require("mongoose");

//Creating a User instance
const User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
});

module.exports = {
  User,
};

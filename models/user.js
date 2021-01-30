const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userMail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema) ;

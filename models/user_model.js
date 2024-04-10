const mongoServer = process.env.MONGO_SERVER;
const mongoose = require("mongoose");
mongoose.connect(mongoServer);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roles: {
    type: Array,
    required: true,
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length >= 1;
      },
      message: "The array must contain at least one item",
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);

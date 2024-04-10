const User = require("../models/user_model");

const userService = {
  getUsers: async () => {
    return await User.find();
  },
  getUserById: async (userId) => {
    return await User.findById(userId);
  },
  newUser: async (body) => {
    const { name, userName, password, email, roles } = body;
    let user = new User({ name, userName, password, email, roles });
    return await user.save();
  },
  updateUser: async (userId, body) => {
    const { name, userName, password, email, roles } = body;
    let user = await User.findById(userId);
    console.log("oldUser: ", user);

    if (!user) {
      console.log("Usuario no existe");
      return user;
    }

    user.set({
      name,
      userName,
      password,
      email,
      roles,
    });

    return await user.save();
  },
};
module.exports = userService;

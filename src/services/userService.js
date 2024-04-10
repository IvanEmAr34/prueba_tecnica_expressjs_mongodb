const { ERROR, SUCCESS } = require("../constants/request");
const User = require("../models/user_model");

const validateUserInfo = ({ _id, ...userInfo }) => {
  let isValidForm = !Object.keys(userInfo).some((userInfoKey) => {
    let isInvalid =
      userInfoKey !== "_id" &&
      (!userInfo[userInfoKey] ||
        userInfo[userInfoKey] === "" ||
        userInfo[userInfoKey].length === 0);
    if (userInfoKey === "confirmPassword" && !isInvalid) {
      isInvalid = !isInvalid && userInfo[userInfoKey] !== userInfo["password"];
    }
    return isInvalid;
  });
  return isValidForm;
};

const getUserInfoFromBody = (body) => {
  if (Object.keys(body).length === 0) {
    return null;
  }
  const { name, userName, password, email, roles } = body;
  return {
    name,
    userName,
    password,
    email,
    roles,
  };
};

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
    const userInfo = getUserInfoFromBody(body);
    if (!userInfo) {
      return {
        type: ERROR,
        message: "invalid body",
      };
    }
    const isValidUserInfo = validateUserInfo(userInfo);
    if (!isValidUserInfo) {
      return {
        type: ERROR,
        message: "invalid user info",
      };
    }
    let user = await User.findById(userId);

    if (!user) {
      console.log("Usuario no existe");
      return user;
    }

    user.set(userInfo);
    const userUpdated = await user.save();
    return {
      type: SUCCESS,
      content: userUpdated,
    };
  },
  validateUserInfo,
  getUserInfoFromBody,
};
module.exports = userService;

import userService from "../services/userService";
const dataSet = [
  [{}, null],
  [
    {
      _id: null,
      roles: [],
      name: "",
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    {
      roles: [],
      name: "",
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  ],
  [
    {
      _id: null,
      roles: [],
      name: "some",
      userName: "value",
      password: "",
      confirmPassword: "",
      email: "",
    },
    {
      roles: [],
      roles: [],
      name: "some",
      userName: "value",
      password: "",
      confirmPassword: "",
      email: "",
    },
  ],
  [
    {
      _id: null,
      roles: ["admin"],
      name: "name test",
      userName: "username test",
      password: "password",
      confirmPassword: "not equal password",
      email: "mail",
    },
    {
      roles: ["admin"],
      name: "name test",
      userName: "username test",
      password: "password",
      confirmPassword: "not equal password",
      email: "mail",
    },
  ],
  [
    {
      _id: null,
      roles: ["admin"],
      name: "name test",
      userName: "username test",
      password: "password123",
      confirmPassword: "password123",
      email: "mail",
    },
    {
      roles: ["admin"],
      name: "name test",
      userName: "username test",
      password: "password123",
      confirmPassword: "password123",
      email: "mail",
    },
  ],
];

const dataSetValidation = [
  [null, false],
  [
    {
      roles: [],
      name: "",
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    false,
  ],
  [
    {
      roles: [],
      roles: [],
      name: "some",
      userName: "value",
      password: "",
      confirmPassword: "",
      email: "",
    },
    false,
  ],
  [
    {
      roles: ["admin"],
      name: "name test",
      userName: "username test",
      password: "password",
      confirmPassword: "not equal password",
      email: "mail",
    },
    false,
  ],
  [
    {
      roles: ["admin"],
      name: "name test",
      userName: "username test",
      password: "password123",
      confirmPassword: "password123",
      email: "mail",
    },
    true,
  ],
];

describe("user tests ", () => {
  test.each(dataSet)("userInfoFromBody", async (body, expectedValue) => {
    expect(userService.getUserInfoFromBody(body)).toStrictEqual(expectedValue);
  });
  test.each(dataSetValidation)(
    "validateUserInfo",
    async (userInfo, expectedValue) => {
      expect(userService.validateUserInfo(userInfo)).toStrictEqual(
        expectedValue
      );
    }
  );
});

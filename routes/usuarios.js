const express = require("express");
const userService = require("../services/userService");
const ruta = express.Router();

ruta.get("/", async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

ruta.get("/:userId", async (req, res) => {
  let userId = req.params.userId;
  const user = await userService.getUserById(userId);
  res.json(user);
});

ruta.post("/", (req, res) => {
  let requestBody = req.body;
  userService
    .newUser(requestBody)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

ruta.put("/:userId", (req, res) => {
  const userId = req.params["userId"];
  const user = userService.updateUser(userId, req.body);
  if (!user) {
    res.status(400).send("invalid user");
  } else {
    res.json(user);
  }
});

module.exports = ruta;

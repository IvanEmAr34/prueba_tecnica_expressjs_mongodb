const express = require("express");
const userService = require("../services/userService");
const { ERROR } = require("../constants/request");
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

ruta.put("/:userId", async (req, res) => {
  const userId = req.params["userId"];
  const response = await userService.updateUser(userId, req.body);
  if (response.type === ERROR) {
    res.status(400).send(response.message);
  }
  res.json(response.content);
});

module.exports = ruta;

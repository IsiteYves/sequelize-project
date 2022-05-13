const express = require("express"),
  {
    getAllUsers,
    getSpecificUser,
    createNewUser,
    updateUser,
    Login,
    deleteUser,
  } = require("../controllers/user.controller"),
  router = express(),
  authenticate = require("../middlewares/auth.middleware"),
  { validateUser, validateLogin } = require("../models/user.model");

router.get("/", getAllUsers);

router.get("/:id", authenticate, getSpecificUser);

router.post("/login", validateLogin, Login);

router.post("/", validateUser, createNewUser);

router.patch("/", validateUser, updateUser);

router.delete("/:id", authenticate, deleteUser);

module.exports = router;

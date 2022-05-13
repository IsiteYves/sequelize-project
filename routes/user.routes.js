const express = require("express"),
  {
    getAllUsers,
    getSpecificUser,
    createNewUser,
    updateUser,
    deleteUser,
  } = require("../controllers/user.controller"),
  router = express(),
  authenticate = require("../middlewares/auth.middleware"),
  { validateUser, validateLogin } = require("../models/user.model");

router.get("/", getAllUsers);

router.get("/:id", authenticate, getSpecificUser);

router.post("/", validateUser, createNewUser);

router.patch("/", validateUser, updateUser);

router.delete("/:id");

module.exports = router;

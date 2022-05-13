const { User } = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  try {
    await User.findAll().then((users) => res.status(200).json(users));
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
};

exports.createNewUser = async (req, res) => {
  try {
    const { name, email, age, address, password } = req.body;
    await User.create({
      name,
      email,
      age,
      address,
      password,
    }).then((user) => res.status(201).json(user));
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
};

exports.getSpecificUser = async (req, res) => {
  try {
    await User.findOne({ where: { user_id: req.params.id } }).then((user) => {
      if (user) res.status(200).json(user);
      else res.status(404).send({ message: "User with that id doesn't exist" });
    });
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, age, address } = req.body;
    await User.findOne({ where: { user_id: req.params.id } }).then(
      async (user) => {
        if (user) {
          await User.update(
            { name, age, address },
            { where: { user_id: req.params.id } }
          ).then((updatedUser) => res.status(200).json(updatedUser));
        } else
          res.status(404).send({ message: "User with that id doesn't exist" });
      }
    );
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { user_id: req.params.id } }).then(() =>
      res.status(200).send({ message: "Successfully deleted the user." })
    );
  } catch (err) {
    res.status(500).send({ message: `Error deleting the user: ${err}` });
  }
};

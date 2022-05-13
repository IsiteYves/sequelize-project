// @ts-nocheck
const bcrypt = require("bcrypt"),
  { User, generateAuthToken } = require("../models/user.model"),
  hashData = require("../utils/hash");

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
    const hashedPassword = await hashData(password);
    await User.create({
      name,
      email,
      age,
      address,
      password: hashedPassword,
    }).then((user) => res.status(201).json(user));
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
};

exports.getSpecificUser = async (req, res) => {
  try {
    await User.findOne({ where: { id: req.params.id } }).then((user) => {
      if (user) res.status(200).json(user);
      else res.status(404).send({ message: "User with that id doesn't exist" });
    });
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (!user)
      res
        .status(404)
        .send({ status: "error", message: "That email isn't registered." });
    else {
      const dbPassword = user.password;
      const isPswdCorrect = await bcrypt.compareSync(password, dbPassword);
      if (!isPswdCorrect)
        res
          .status(404)
          .send({ status: "error", message: "Incorrect password.`" });
      else {
        const token = generateAuthToken(user);
        let u = { ...user };
        delete u.password;
        res.header("Authorization", token).status(200).send({
          status: 200,
          message: "Login Successful",
          token,
          data: u,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "error", message: "Error while logging you in.", err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, age, address } = req.body;
    await User.findOne({ where: { id: req.params.id } }).then(async (user) => {
      if (user) {
        await User.update(
          { name, age, address },
          { where: { id: req.params.id } }
        ).then((updatedUser) =>
          res.status(200).send("Successfully updated the user.")
        );
      } else
        res.status(404).send({ message: "User with that id doesn't exist" });
    });
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } }).then(() =>
      res.status(200).send({ message: "Successfully deleted the user." })
    );
  } catch (err) {
    res.status(500).send({ message: `Error deleting the user: ${err}` });
  }
};

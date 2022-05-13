// @ts-nocheck
const Sequelize = require("sequelize"),
  db = require("../config/db.config"),
  Joi = require("joi"),
  jwt = require("jsonwebtoken");
Joi.objectId = require("joi-objectid")(Joi);

const User = db.define("gig", {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  address: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

function validateUser(req, res, next) {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(200).required(),
      email: Joi.string().email().required(),
      age: Joi.number().min(6).max(150).required(),
      address: Joi.string().min(10).max(150).required(),
      password: Joi.string().min(6).max(25).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  } catch {
    res.status(400).send({ message: "Error while validating User object" });
  }
}
function validateLogin(req, res, next) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(25).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  } catch {
    res.status(400).send({ message: "Error validating Login info" });
  }
}
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this.id, email: this.email },
    process.env.JWT_KEY
  );
  const finalToken = "Bearer " + token;
  return finalToken;
};

module.exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;

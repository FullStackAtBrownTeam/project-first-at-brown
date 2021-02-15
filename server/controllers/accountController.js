const jwt = require("jsonwebtoken");
// const { validationResult } = require("express-validator");

const account = require("../models/account");

exports.login = async (req, res, next) => {
  const token = req.body.token;

  try {
    const result = await account.login(token);
    const accountId = result.account_id;

    // create jwt
    const jwtoken = jwt.sign({ accountId }, process.env.JWT_KEY);

    res.json({ token: jwtoken, accountId });
  } catch (error) {
    return next(error);
  }
};

exports.signup = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const year = req.body.year;
  const concentration = req.body.concentration;
  const picture = ""; // TODO: upload or url?
  const pronouns = req.body.pronouns;
  const email = req.body.email;
  const token = req.body.token;

  try {
    const result = await account.create({
      first_name: firstName,
      last_name: lastName,
      year,
      concentration,
      pronouns,
      email,
      token,
      picture,
    });

    const accountId = result.account_id;

    // can use
    const jwtoken = jwt.sign({ email, accountId }, process.env.JWT_KEY);

    res.status(201).json({ token: jwtoken, accountId });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.getAccount = (req, res, next) => {
  const accountId = req.params.accountId;
};

exports.editAccount = (req, res, next) => {
  const accountId = req.params.accountId;
};

exports.getAccounts = (req, res, next) => {
  const accountIds = req.body.accountIds; // array of accountIds
};

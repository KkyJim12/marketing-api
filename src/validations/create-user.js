const { body, check, validationResult } = require("express-validator");
const db = require("../models/index");
const User = db.user;

const createUserValidate = () => {
  return [
    check("fullName").not().isEmpty().withMessage("Please type full name"),
    check("email").not().isEmpty().withMessage("Please type email"),
    body("email").custom(async (value) => {
      const checkEmailExist = await User.count({ where: { email: value } });
      if (checkEmailExist > 0) {
        throw new Error("E-mail already in use");
      }
    }),
    check("phone").not().isEmpty().withMessage("Please type phone"),
    check("password").not().isEmpty().withMessage("Please type password"),
  ];
};

const createUserValidateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors
    .array()
    .map((err) => extractedErrors.push({ key: err.path, message: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = { createUserValidate, createUserValidateResult };

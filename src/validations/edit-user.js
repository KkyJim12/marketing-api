const { body, check, validationResult } = require("express-validator");
const db = require("../models/index");
const User = db.user;

const editUserValidate = () => {
  return [
    check("fullName").not().isEmpty().withMessage("Please type full name"),
    check("phone").not().isEmpty().withMessage("Please type phone"),
  ];
};

const editUserValidateResult = (req, res, next) => {
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

module.exports = { editUserValidate, editUserValidateResult };

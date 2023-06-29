const { body, check, validationResult } = require("express-validator");

const adminLoginValidate = () => {
  return [
    check("email").not().isEmpty().withMessage("Please type email"),

    check("password").not().isEmpty().withMessage("Please type password"),
  ];
};

const adminLoginValidateResult = (req, res, next) => {
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

module.exports = { adminLoginValidate, adminLoginValidateResult };

const { body, check, validationResult } = require("express-validator");

const createPageValidate = () => {
  return [
    check("name").not().isEmpty().withMessage("Please type page name"),
    check("sortType").not().isEmpty().withMessage("Please select sort type"),
    check("sortValue").not().isEmpty().withMessage("Please type sort value"),
  ];
};

const createPageValidateResult = (req, res, next) => {
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

module.exports = { createPageValidate, createPageValidateResult };

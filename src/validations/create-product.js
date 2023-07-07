const { body, check, validationResult } = require("express-validator");

const createProductValidate = () => {
  return [
    check("name").not().isEmpty().withMessage("Please type product name"),
    check("type").not().isEmpty().withMessage("Please select product type"),
    check("domains")
      .not()
      .isEmpty()
      .withMessage("Please type product domains number"),
    check("duration")
      .not()
      .isEmpty()
      .withMessage("Please type product duration"),
    check("price").not().isEmpty().withMessage("Please type product price"),
    check("image").not().isEmpty().withMessage("Please upload product image"),
  ];
};

const createProductValidateResult = (req, res, next) => {
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

module.exports = { createProductValidate, createProductValidateResult };

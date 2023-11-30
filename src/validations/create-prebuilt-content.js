const { body, check, validationResult } = require("express-validator");

const createPrebuiltContentValidate = () => {
  return [
    check("name").not().isEmpty().withMessage("Please type name"),
    check("textColor").not().isEmpty().withMessage("Please select text color"),
    check("icon").not().isEmpty().withMessage("Please select icon"),
    check("textContent").not().isEmpty().withMessage("Please type content"),
    check("description").not().isEmpty().withMessage("Please type description"),
    check("destination")
      .not()
      .isEmpty()
      .withMessage("Please select url destination"),
  ];
};

const createPrebuiltContentValidateResult = (req, res, next) => {
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

module.exports = {
  createPrebuiltContentValidate,
  createPrebuiltContentValidateResult,
};

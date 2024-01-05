const { body, check, validationResult } = require("express-validator");

const saveButtonContentValidate = () => {
  return [
    check("contents.*.textColor")
      .not()
      .isEmpty()
      .withMessage("Please select text color"),
    check("contents.*.icon").not().isEmpty().withMessage("Please select icon"),
    check("contents.*.textContent")
      .not()
      .isEmpty()
      .withMessage("Please type content"),
    check("contents.*.destination")
      .not()
      .isEmpty()
      .withMessage("Please select url destination"),
    check("contents.*.sortValue")
      .not()
      .isEmpty()
      .withMessage("Please type sort value"),
  ];
};

const saveButtonContentValidateResult = (req, res, next) => {
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
  saveButtonContentValidate,
  saveButtonContentValidateResult,
};

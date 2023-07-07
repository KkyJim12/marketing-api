const { body, check, validationResult } = require("express-validator");

const imageValidate = () => {
  return [
    // Check Image
    check("image")
      .not()
      .isMimeType(["jpg", "png", "gif", "svg"])
      .withMessage("Upload only image type"),
  ];
};

const imageValidateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = { imageValidate, imageValidateResult };

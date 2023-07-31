const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const isAdmin = require("../../middlewares/isAdmin.js");

module.exports = (app) => {
  const {
    imageValidate,
    imageValidateResult,
  } = require("../../validations/upload-image");

  const multer = require("multer");

  const destinationPath = "public/uploads/images";

  const randomUuid = uuidv4();

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      cb(null, randomUuid + "_" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  router.post(
    "/",
    isAdmin,
    imageValidate(),
    imageValidateResult,
    upload.single("image"),
    (req, res) => {
      try {
        const newFileName = randomUuid + "_" + req.file.originalname;
        const returnUrl =
          process.env.API_URL + "/uploads/images/" + newFileName;
        res.status(201).send({
          status: "success",
          data: returnUrl,
          message: "Upload image success.",
        });
      } catch (error) {
        res.status(500).send({
          status: "fail",
          message: "Something went wrong.",
        });
      }
    }
  );

  app.use("/api/v1/admin/images", router);
};

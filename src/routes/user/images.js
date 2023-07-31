const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const {
  imageValidate,
  imageValidateResult,
} = require("../../validations/upload-image");

const multer = require("multer");

const randomUuid = uuidv4();
const isAuth = require("../../middlewares/isAuth.js");

module.exports = (app) => {
  const destinationPath = "public/uploads/images";
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
    isAuth,
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

  app.use("/api/v1/user/images", router);
};

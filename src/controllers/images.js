const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
require("dotenv").config();

exports.upload = async (req, res) => {
  try {
    const destinationPath = "public/uploads/image";
    const newFileName =
      uuidv4() + "_" + file.originalname + path.extname(file.originalname);
    const imagePath =
      process.env.HOST + "/" + destinationPath + "/" + newFileName;

    // Set multer
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, destinationPath);
      },
      filename: function (req, file, cb) {
        cb(null, newFileName);
      },
    });

    const upload = multer({ storage: storage });
    upload.single("image");

    res.status(201).send({
      status: "success",
      data: imagePath,
      message: "Upload image success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

const express = require("express");

const router = express.Router();
const upload = require("../middleware/multer.middleware");
const uploadController = require("../controllers/upload.controller");
router.post(
  "/uploadFile",
  upload.array("files", 5),
  uploadController.uploadFiles
);
router.get("/allFiles", uploadController.getAllFiles);
module.exports = router;

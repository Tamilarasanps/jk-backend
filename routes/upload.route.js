const express = require("express");
const router = express.Router();
const {
  getAllImages,
  uploadAllImages,
} = require("../controllers/upload.controller");
const Upload = require("../middleware/multer.middleware");

router.post("/upload", Upload.single("file"), uploadAllImages);
router.get("/getImages", getAllImages);
module.exports = router;

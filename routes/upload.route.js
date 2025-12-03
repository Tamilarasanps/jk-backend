const express = require("express");
const router = express.Router();
const {
  getAllImages,
  uploadAllImages,
  deleteImage
} = require("../controllers/upload.controller");
const Upload = require("../middleware/multer.middleware");

router.post("/upload", Upload.single("file"), uploadAllImages);
router.get("/getImages", getAllImages);
router.delete("/deleteImage/:id",deleteImage)
module.exports = router;

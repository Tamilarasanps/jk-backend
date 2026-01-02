const express = require("express");
const router = express.Router();
const {
  uploadPdf,
  getAllPdfs,
  deletePdf,
} = require("../controllers/pdfController");

// Define the POST route for uploading a PDF
router.post("/uploadPdf", uploadPdf);
router.get("/getPdf", getAllPdfs);
router.delete("/pdfs/:filename", deletePdf);
module.exports = router;

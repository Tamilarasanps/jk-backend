const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads";
    // Ensure the 'uploads' directory exists, or create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Use the original file name with a timestamp to avoid name conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with the defined storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Only PDFs are allowed");
    }
  },
}).single("pdf"); // Expect a file field named 'pdf'

// Controller function to handle the file upload
exports.uploadPdf = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    // If the file is uploaded successfully
    return res.status(200).json({
      message: "PDF uploaded successfully!",
      file: req.file,
    });
  });
};

// GET all uploaded PDFs
exports.getAllPdfs = (req, res) => {
  const uploadDir = path.join(__dirname, "..", "uploads");

  if (!fs.existsSync(uploadDir)) {
    return res.status(200).json({ files: [] });
  }

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to read files" });
    }

    // Filter only PDFs
    const pdfFiles = files.filter((file) => path.extname(file) === ".pdf");

    res.status(200).json({
      count: pdfFiles.length,
      files: pdfFiles,
    });
  });
};

// DELETE a PDF by filename
exports.deletePdf = (req, res) => {
  const { filename } = req.params;

  if (!filename) {
    return res.status(400).json({ message: "Filename is required" });
  }

  const uploadDir = path.join(__dirname, "..", "uploads");
  const filePath = path.join(uploadDir, filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "PDF not found" });
  }

  // Delete the file
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting PDF",
        error: err.message,
      });
    }

    return res.status(200).json({
      message: "PDF deleted successfully",
    });
  });
};

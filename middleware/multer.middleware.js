// const multer = require("multer");
// const path = require("path");

// // Storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // keep original extension
//   },
// });

// // File filter
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|pdf/;

//   const extName = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimeType = allowedTypes.test(file.mimetype);

//   if (extName && mimeType) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images (JPEG, PNG) and PDF files are allowed!"));
//   }
// };

// // Multer setup
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
// });

// module.exports = upload;

const multer = require("multer");

const storage = multer.memoryStorage(); // store file in memory buffer
const upload = multer({ storage });

module.exports = upload;

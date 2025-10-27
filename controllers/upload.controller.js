// const fs = require("fs");
// const path = require("path");
// const BASE_URL = "http://localhost:5000";

// exports.uploadFiles = (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No files uploaded" });
//     }

//     const fileDetails = req.files.map((file) => ({
//       fileName: file.filename,
//       path: file.path,
//       mimeType: file.mimetype,
//       size: file.size,
//     }));

//     res.status(200).json({
//       message: "Files uploaded successfully",
//       files: fileDetails,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "File upload failed",
//       error: error.message,
//     });
//   }
// };

// exports.getAllFiles = (req, res) => {
//   const directoryPath = path.join(__dirname, "../uploads"); // relative to controller

//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       return res.status(500).json({ message: "Unable to scan files" });
//     }

//     const fileUrls = files.map((file) => `${BASE_URL}/uploads/${file}`);
//     res.json(fileUrls);
//   });
// };

const Project = require("../models/projects.model");
exports.uploadFiles = async (req, res) => {
  try {
    const files = req.files;
    console.log("files :", files);
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const savedProjects = [];

    for (const file of files) {
      const newProject = new Project({
        name: file.originalname,
        file: file.buffer,
        contentType: file.mimetype,
      });
      console.log("newProject :", newProject);
      await newProject.save();
      savedProjects.push(newProject._id);
    }

    res.json({
      message: "Files saved in DB successfully",
      projectIds: savedProjects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

// exports.getAllFiles = async (req, res) => {
//   try {
//     const projects = await Project.find({}); // get all projects
//     if (!projects || projects.length === 0) {
//       return res.status(404).json({ message: "No files found" });
//     }

//     // Prepare array of files with name, type, and base64 data
//     const files = projects.map((project) => ({
//       name: project.name,
//       contentType: project.contentType,
//       data: project.file.toString("base64"), // convert buffer to base64
//     }));

//     res.json(files);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching files" });
//   }
// };

exports.getAllFiles = async (req, res) => {
  try {
    const projects = await Project.find({});
    console.log("FetchProject Data :", projects);
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No files found" });
    }

    const files = projects.map((project) => ({
      id: project._id,
      name: project.name,
      contentType: project.contentType,
      url: project.file,
      // url: `/api/upload/getFile/${project._id}`, // single fetch per image
    }));
    console.log("getFiles :", files);
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching files" });
  }
};

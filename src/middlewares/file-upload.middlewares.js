const multer = require("multer");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const upload = multer({ storage: multer.memoryStorage() });

const fileUploadMiddleware = (req, res, next) => {
  // console.log()
  if (!req.files) {
    return next();
  }

  const uploadMiddleware = req.files
    ? upload.array("files")
    : upload.single("file");

  uploadMiddleware(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        console.error("Multer error:", err);
        return res.status(500).json({ message: "File upload failed" });
      } else if (err) {
        console.error("Unknown error:", err);
        return res.status(500).json({ message: "File upload failed" });
      }

      if (!req.files && !req.file) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const fileUrls = await Promise.all(
        (req.files || [req.file]).map(async (file) => {
          const result = await uploadOnCloudinary(file.buffer, "uploads");
          console.log({ url: result.secure_url });
          return { url: result.secure_url, publicId: result.public_id };
        })
      );

      req.fileUrls = fileUrls;
      next();
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

module.exports = fileUploadMiddleware;

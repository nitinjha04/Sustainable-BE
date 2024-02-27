const multer = require("multer");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage: storage });

const dataUri = (files) => {
  if (Array.isArray(files)) {
    // Handle multiple files
    if (files.length > 0) {
      const dataUris = files.map((file) => {
        return new Datauri().format(
          path.extname(file.originalname).toString(),
          file.buffer
        );
      });
      return dataUris;
    }
  } else {
    // Handle single file
    if (files) {
      return new Datauri().format(
        path.extname(files.originalname).toString(),
        files.buffer
      );
    }
  }
  return null;
};

module.exports = { multerUploads, dataUri };

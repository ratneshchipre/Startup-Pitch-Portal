import multer from "multer";
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/"];
  const allowedVideoTypes = ["video/"];
  const allowedPdfType = "application/pdf";

  const mimeType = file.mimetype;

  if (
    allowedImageTypes.some((prefix) => mimeType.startsWith(prefix)) ||
    allowedVideoTypes.some((prefix) => mimeType.startsWith(prefix)) ||
    mimeType === allowedPdfType
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type. Only images (JPG, PNG), videos (MP4, WebM, etc.), and PDF files are allowed."
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

export default upload;

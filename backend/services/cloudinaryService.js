import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (buffer, folder, fileMimeType) => {
  return new Promise((resolve, reject) => {
    let resourceType = "auto";
    const options = {
      folder: folder,
    };

    if (fileMimeType.startsWith("video/")) {
      resourceType = "video";
    } else if (fileMimeType.startsWith("image/")) {
      resourceType = "image";
    } else if (fileMimeType === "application/pdf") {
      resourceType = "raw";
    }

    options.resource_type = resourceType;

    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(buffer);
  });
};

export default uploadToCloudinary;

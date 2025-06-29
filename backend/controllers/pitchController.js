import Pitch from "../models/pitchModel.js";
import uploadToCloudinary from "../services/cloudinaryService.js";

const handleCreatePitch = async (req, res) => {
  try {
    const { title, details, category, goal, tags } = req.body;

    if (!title || !details || !category || !goal || !tags) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const pitch = await Pitch.create({
      userId: req.user.id,
      title,
      details,
      category,
      goal,
      tags,
    });

    if (!pitch) {
      return res.status(400).json({
        success: false,
        message: "Failed to create a pitch. Please try again later",
      });
    }

    return res.status(201).json({
      success: true,
      message: "A new pitch has been created successfully",
      pitchData: {
        id: pitch._id,
        userId: req.user.id,
        title: pitch.title,
        details: pitch.details,
        category: pitch.category,
        goal: pitch.goal,
        tags: pitch.tags,
      },
    });
  } catch (error) {
    console.error("Error occurred while creating a pitch:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create a pitch. Please try again later",
    });
  }
};

const handlePitchFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file found. Please upload a file",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated or invalid user ID",
      });
    }

    const userId = req.user.id;
    const pitch = await Pitch.findOne({ userId });

    if (!pitch) {
      return res.status(404).json({
        success: false,
        message: "No pitch found for the user",
      });
    }

    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      "nextmove/pitches",
      req.file.mimetype
    );

    const mimeType = req.file.mimetype;
    let fileType = "";

    if (mimeType.startsWith("video/")) {
      fileType = "video";
    } else if (mimeType.startsWith("image/")) {
      fileType = "image";
    } else if (mimeType === "application/pdf") {
      fileType = "pdf";
    } else {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type",
      });
    }

    if (fileType) {
      pitch.file = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        uploadedAt: new Date(),
        type: fileType,
      };
    }

    await pitch.save();

    return res.status(200).json({
      success: true,
      message: "Pitch file uploaded successfully",
      pitchData: {
        id: pitch._id,
        userId: req.user.id,
        file: pitch.file,
      },
    });
  } catch (error) {
    console.error("Error occurred while uploading pitch file:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload pitch file. Please try again later",
    });
  }
};

export { handleCreatePitch, handlePitchFileUpload };

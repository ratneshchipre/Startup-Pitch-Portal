import Pitch from "../../models/pitchModel.js";

const getAllPitchesForInvestor = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login to continue",
      });
    }

    const pitches = await Pitch.find({});

    if (!pitches) {
      return res.status(404).json({
        success: false,
        message: "Nothing to show here. Please try again later",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pitches fetched successfully",
      pitches,
    });
  } catch (error) {
    console.error("Error occurred while fetching all pitches:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all pitches. Please try again later",
    });
  }
};

export { getAllPitchesForInvestor };

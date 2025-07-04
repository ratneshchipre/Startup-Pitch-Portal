import Pitch from "../models/pitchModel.js";

const getPitchDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { pitchId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login to continue",
      });
    }

    const pitch = await Pitch.findById(pitchId);

    if (!pitch) {
      return res.status(404).json({
        success: false,
        message: "Pitch not found. Please try again later",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pitch details fetched successfully",
      pitch,
    });
  } catch (error) {
    console.error("Error occurred while fetching pitch details:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch pitch details. Please try again later",
    });
  }
};

export { getPitchDetails };

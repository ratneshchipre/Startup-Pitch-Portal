import User from "../models/userModel.js";

const getUserData = async (req, res) => {
  try {
    const { role, userId } = req.params;

    if (!role || !userId) {
      return res.status(400).json({
        success: false,
        message: "User role and ID not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found. Please try again later",
      });
    }

    if (user.role.toLowerCase() !== role) {
      return res.status(400).json({
        success: false,
        message: "User role does not match",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      userData: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user data. Please try again later",
    });
  }
};

export { getUserData };

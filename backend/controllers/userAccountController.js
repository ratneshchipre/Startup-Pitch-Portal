import User from "../models/userModel.js";

const getUserData = async (req, res) => {
  try {
    const { role, userId } = req.params;

    if (!role || !userId) {
      return res.status(404).json({
        success: false,
        message: "User role and ID not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please try again later",
      });
    }

    if (user.role !== role) {
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
        address: user.address,
        country: user.country,
        city: user.city,
        phone: user.phone,
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

const updateUserData = async (req, res) => {
  try {
    const { role, userId } = req.params;
    const { firstName, lastName, email, address, country, city, phone } =
      req.body;

    if (!role || !userId) {
      return res.status(404).json({
        success: false,
        message: "User role and ID not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please try again later",
      });
    }

    if (user.role !== role) {
      return res.status(400).json({
        success: false,
        message: "User role does not match",
      });
    }

    const updatedUserData = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, address, country, city, phone },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUserData) {
      return res.status(400).json({
        success: false,
        message: "Failed to update user data. Please try again later",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User data updated successfully",
      userData: {
        id: updatedUserData._id,
        firstName: updatedUserData.firstName,
        lastName: updatedUserData.lastName,
        email: updatedUserData.email,
        role: updatedUserData.role,
        address: updatedUserData.address,
        country: updatedUserData.country,
        city: updatedUserData.city,
        phone: updatedUserData.phone,
      },
    });
  } catch (error) {
    console.error("Error updating user data: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user data. Please try again later",
    });
  }
};

export { getUserData, updateUserData };

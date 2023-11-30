// userController.js
const userModel = require("../models/User");
const { successResponse, errorResponse } = require("../utils/response");

async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.json(successResponse(users));
  } catch (error) {
    res.status(500).json(errorResponse("Error fetching users", error));
  }
}

async function getUsersByType(req, res) {
  const userType = req.params.type;

  try {
    const users = await userModel.getUserByType(userType);

    if (!users) {
      res
        .status(404)
        .json(errorResponse(`No users found with user type: ${userType}`));
    } else {
      res.json(successResponse(users));
    }
  } catch (error) {
    res.status(500).json(errorResponse("Error fetching users by type", error));
  }
}

module.exports = {
  getAllUsers,
  getUsersByType,
};

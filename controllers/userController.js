const User = require("../models/userModel");
const generateToken = require("../generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User is already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({
        success: true,
        message: `Welcome ${user.name}`,
        token: token,
        user: user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User creating is failed",
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Error in creating user",
      error: error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "E-mail doest not exists",
      });
    }

    const auth = await user.matchPassword(password);

    if (auth) {
      const token = generateToken(user._id);

      res.status(200).json({
        success: true,
        message: `Welcome ${user.name}`,
        token: token,
        user: user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User Credentials are invalid",
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Error in creating user",
      error: error,
    });
  }
};

module.exports = { registerUser, loginUser };

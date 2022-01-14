const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc Register a new user
// @routes POST /api/v0/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  res.status(200).json({ success: true, user: removePasswordField(user) });
});

// @desc Register a new user
// @routes POST /api/v0/auth/register
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for a user
  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  res.status(200).json({ success: true, user: removePasswordField(user) });
});


const removePasswordField = (user) => {
  const userObj = user.toObject();
  delete userObj['password'];
  return userObj;
}
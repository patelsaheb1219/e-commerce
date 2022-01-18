const jwt = require("jsonwebtoken");

// Import Middleware
const asyncHandler = require("../middleware/async");

// Import Model
const User = require("../models/User");

// Import ErrorResponse class
const ErrorResponse = require("../utils/errorResponse");

const { removePasswordField } = require("../utils/utils");

// @desc Register a new user
// @routes POST /api/v0/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, telephone } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
    telephone
  });
  const token = jwt.sign(
    { user_id: user._id, email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE
    }
  )
  res.status(200).json({ success: true, data: token });
});

// @desc Login a User
// @routes POST /api/v0/auth/login
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
  const token = jwt.sign(
    { user_id: user._id, email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE
    }
  )
  res.status(200).json({ success: true, data: token });
});

// @desc Update a User
// @routes PUT /api/v0/auth/update
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    let user = User.findById(req.params.id);
    if (user) {
      const { name, email } = req.body;
      const fieldToUpdate = {
        name,
        email,
      };

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        fieldToUpdate,
        {
          runValidator: true,
          new: true,
        }
      );

      res.status(200).json({ status: true, data: updatedUser });
    } else {
      return next(new ErrorResponse(`User ${req.params.id} is not authorized to update`, 401));
    }
  } else {
    return next(new ErrorResponse(`Opps! User ID not found`, 404));
  }
});


exports.getUserFromToken = asyncHandler(async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const auth = req.headers.authorization.split(' ')[1];
    try {
      const decodedUser = jwt.verify(auth, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decodedUser.user_id });
      res.status(200).json({ status: true, data: user });
    } catch (e) {
      return next(new ErrorResponse('User is Unauthorized', 401));
    }
  } else {
    return next(new ErrorResponse(`Authorization Token not found`, 404));
  }
});
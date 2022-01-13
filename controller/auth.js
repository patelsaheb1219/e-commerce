const User = require("../models/User");

// @desc Register a new user
// @routes POST /api/v0/auth/register
// @access Public
exports.register = async (req, res, next) => {
  console.log("Request", req.body);
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  res.status(200).json({ success: true, user });
}
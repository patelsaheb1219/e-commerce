// Remove Password field before returning user object
exports.removePasswordField = (user) => {
  const userObj = user.toObject();
  delete userObj['password'];
  return userObj;
}
const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updateUser
} = require("../controller/auth");

router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', updateUser);

module.exports = router;
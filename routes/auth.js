const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updateUser,
  getUserFromToken
} = require("../controller/auth");

router.get('/getme', getUserFromToken);
router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', updateUser);

module.exports = router;
const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");


// REGISTER
router.post("/register", registerUser);


// LOGIN
router.post("/login", loginUser);


// PROTECTED ROUTE
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});


module.exports = router;
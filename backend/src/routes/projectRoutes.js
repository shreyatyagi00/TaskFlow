const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const adminOnly = require(
  "../middleware/roleMiddleware"
);

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");


// CREATE PROJECT
router.post(
  "/",
  protect,
  adminOnly,
  createProject
);


// GET PROJECTS
router.get(
  "/",
  protect,
  getProjects
);


module.exports = router;
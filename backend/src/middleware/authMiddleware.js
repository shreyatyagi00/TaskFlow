const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {

    // Get token from headers
    const token = req.headers.authorization;

    // Check token exists
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // Remove Bearer from token
    const actualToken = token.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      actualToken,
      process.env.JWT_SECRET
    );

    // Save user data in request
    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = protect;
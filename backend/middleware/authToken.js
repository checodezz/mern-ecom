const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "Authorization token not found, please login.",
        error: true,
        success: false,
      });
    }

    const token = authHeader.split(" ")[1]; // Extract token from the Bearer header
    // console.log(token);

    if (!token) {
      return res.status(400).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    // Verify token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (error, decoded) {
      // console.log(error, decoded);
      if (error) {
        return res.status(401).json({
          message: "Invalid or expired token",
          error: true,
          success: false,
        });
      }

      // Set user ID from decoded token
      req.userId = decoded?._id;

      next();
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;

const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

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
        return res.json({
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

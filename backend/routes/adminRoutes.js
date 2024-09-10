const express = require("express");
const router = express.Router();

const allUsersController = require("../controller/admin/allUsers");
const authToken = require("../middleware/authToken");
const updateUser = require("../controller/admin/updateUser");

// admimn panel
router.get("/all-user", authToken, allUsersController);
router.post("/update-user", authToken, updateUser);

router.get("/token", (req, res) => {
  const token = req.cookies.token; // Access the token from cookies

  if (token) {
    // Process token
    res.status(200).json({ message: "Token found", token });
  } else {
    res.status(404).json({ message: "Token not found." });
  }
});

module.exports = router;

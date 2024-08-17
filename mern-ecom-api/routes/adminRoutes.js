const express = require("express");
const router = express.Router();

const allUsersController = require("../controller/admin/allUsers");
const authToken = require("../middleware/authToken");
const updateUser = require("../controller/admin/updateUser");

// admimn panel
router.get("/all-user", authToken, allUsersController);
router.post("/update-user", authToken, updateUser);

module.exports = router;

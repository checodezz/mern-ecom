async function userLogoutController(req, res) {
  try {
    const tokenOption = { httpOnly: true, secure: true, sameSite: "None" };
    // clear cookie
    res.clearCookie("token", tokenOption);

    res.json({
      data: [],
      message: "Logged out successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogoutController;

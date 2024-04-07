const logoutController = (req, res) => {
  try {
    if (!req.cookies.token && !req.cookies.refreshToken) {
      return res
        .status(400)
        .json({ status: "fail", message: "Token cookie not found" });
    }
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = logoutController;

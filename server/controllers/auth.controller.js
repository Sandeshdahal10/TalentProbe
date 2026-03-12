/**
 * Auth Controller
 * Handlers for authentication-related endpoints (Google auth and logout).
 * - `googleAuth`: creates/returns user and sets auth cookie
 * - `logOut`: clears the auth cookie
 */
import generateToken from "../config/token.js";
import User from "../model/user.model.js";
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }
    let token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error in google auth: ${error.message}` });
  }
};

export const logOut = async (req, res) => {
  try {
    await res.clearCookie("token",{
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error in logging out: ${error.message}` });
  }
};

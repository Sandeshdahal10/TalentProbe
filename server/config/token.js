/**
 * Token utility
 * Generates a JWT for a given user ID using the configured secret.
 */
import jwt from "jsonwebtoken";
const generateToken = async (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};
export default generateToken;

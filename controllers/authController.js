import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";
import { db } from '../utils/db.js';

export const renderLoginPage = async (req, res) => {
  try {
    // 1. Render page
    return res.render("auth.ejs");

  } catch (err) {
    console.error("GET /auth error:", err.message);
    return res.status(500).send("Internal server error");
  }
}
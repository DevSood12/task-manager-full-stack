import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: DevSood
 *               email:
 *                 type: string
 *                 example: dev@gmail.com
 *               password:
 *                 type: string
 *                 example: Dev12345
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error / user already exists
 *       500:
 *         description: Server error
 */

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: dev@gmail.com
 *               password:
 *                 type: string
 *                 example: Dev12345
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials / missing fields
 *       500:
 *         description: Server error
 */

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get logged-in user profile (Protected)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       401:
 *         description: Unauthorized / Token missing
 *       500:
 *         description: Server error
 */

// GET /api/auth/profile (protected)
router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  return res.json(user);
});

export default router;

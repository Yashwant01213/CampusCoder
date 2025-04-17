import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.mjs';

const isProduction = process.env.NODE_ENV === "production";

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password, role, institution } = req.body;

    if (!name || !email || !password || !role || !institution) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role, institution });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      domain: isProduction ? "devcampuscoder.netlify.app" : undefined,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name, email, role, institution }
    });

  } catch (error) {
    console.error("🔥 Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      domain: isProduction ? "devcampuscoder.netlify.app" : undefined,
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT
const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
    domain: isProduction ? "devcampuscoder.netlify.app" : undefined,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export { register, login, logout };

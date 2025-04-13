

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import User from '../models/User.mjs';

// REGISTER USER
//const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const register = async (req, res) => {
    try {
        console.log("Incoming register body:", req.body); 
        const { name, email, password, role, institution } = req.body;
       
        
        if (!name || !email || !password || !role || !institution) {
            return res.status(400).json({ message: 'Missing required fields' });
          }
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        user = new User({ name, email, password: hashedPassword, role, institution });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Set token in HTTP-only cookie
        res.cookie("token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
  
        res.status(201).json({ message: "User registered successfully", user: { id: user._id, name, email, role, institution } });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN USER
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Set token in HTTP-only cookie
        res.cookie("token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email, role: user.role } });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
const logout = (req, res) => {
        res.cookie("token", "", { 
            httpOnly: true, 
            expires: new Date(0) // Expire the cookie immediately
        });
        res.status(200).json({ message: "Logged out successfully" });
    };

export  { register, login , logout};

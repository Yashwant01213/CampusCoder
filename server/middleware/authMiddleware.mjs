import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.token; // Get JWT from cookie
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

export default  authMiddleware;

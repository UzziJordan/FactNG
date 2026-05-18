const jwt = require('jsonwebtoken');

//Middleware to protect routes
const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if the Authorization header is present and starts with "Bearer"
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Extract the token from the header
        const token = authHeader.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user ID to request object for use in protected routes
        req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = protect;
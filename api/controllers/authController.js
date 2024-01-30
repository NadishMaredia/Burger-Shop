const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    jwt.verify(token.split(' ')[1], config.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }

        req.user = decoded; // Attach decoded user information to the request object
        next();
    });
};

module.exports = {
    authenticateToken
};

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_prod_12345';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    console.log('[AuthMiddleware] Header:', authHeader);
    console.log('[AuthMiddleware] Token found:', !!token);

    if (!token) {
        console.log('[AuthMiddleware] No token provided');
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado: Token no proporcionado'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log('[AuthMiddleware] Token invalid:', err.message);
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado: Token inválido o expirado'
            });
        }

        console.log('[AuthMiddleware] Token verified for user:', user.username);
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;

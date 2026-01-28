const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_prod_12345';

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Hardcoded credentials for this challenge
    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign(
            { username: 'admin', role: 'administrator' },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({
            success: true,
            token,
            user: { username: 'admin', role: 'administrator' }
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
    });
});

module.exports = router;

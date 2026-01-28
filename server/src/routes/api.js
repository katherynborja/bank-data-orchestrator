const express = require('express');
const router = express.Router();
const bankDataService = require('../services/bankData');
const authenticateToken = require('../middleware/auth');

// GET /api/external-data
// Protected route: requires valid JWT
router.get('/external-data', authenticateToken, async (req, res) => {
    try {
        const data = await bankDataService.fetchBankData();
        res.json({
            success: true,
            data: data,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

module.exports = router;

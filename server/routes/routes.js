const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');

// Server routes
router.get('/', (request, response, next) => {
    response.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Socket works!'
    });
});
router.get('/server', (request, response, next) => {
    console.log("API works!");
    response.status(200).json({
        success: true,
        statusCode: 200,
        message: 'API works!'
    });
});

// Send OTP to an user email
router.post('/send_otp_to_mail', usersCtrl.sendOtpToMail);

module.exports = router;
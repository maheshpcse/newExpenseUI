const moment = require('moment');
const _ = require('underscore');
const nodemailer = require('nodemailer');
const randomString = require('randomstring');
const config = require('../config/config');

const sendOtpToMail = async (request, response, next) => {
    console.log('request body isss', request.body);
    let result = {};
    let message = '';
    try {
        const {
            email
        } = request.body;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 465,
            secure: true,
            auth: {
                user: config.email.name,
                pass: config.email.password
            }
        });

        const otpCode = randomString.generate({
            length: 6,
            charset: 'numeric'
        });

        // <p style="font-size: 1.1rem;">Hi <b style="color: mediumseagreen;">${userName}</b>, Greetings From <b style="color: seagreen;">Expense System</b> App!</p>
        //             <br></br>

        const mailOptions = {
            from: config.email.name,
            to: `${email}`,
            subject: 'One Time Password to change password in Expense System App',
            html: `<div style="padding: 15px; border: 2px solid #ccc !important;">
            <div style="width:50%;box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);margin: 0 auto;">
                <header style="height: 100px;text-align: center !important;border: 3px solid cornflowerblue;background-color: cornflowerblue !important;">
                    <h6 style="font-size: 1.3rem;color: white;margin: 5.5%;">OTP Mail - Expense System</h6>
                </header>
                <br><br>
                <div style="padding: 5px;text-align: center !important;height: 130px;">
                    <div>
                        Verify your email with newly generated OTP : <span class="otp-code w3-wide" style="font-weight: 400;padding: 10px;
                        border: 1px dashed teal;color: #1667af;letter-spacing: 4px;">${otpCode}</span>
                    </div>
                </div>
            </div>
        </div>`
        }

        await transporter.sendMail(mailOptions, async (err, info) => {
            if (err) {
                console.log('Error while sending an email', err);
                result = {
                    success: false,
                    error: true,
                    statusCode: 500,
                    message: 'Error while sending an email',
                    data: []
                }
                return response.status(200).json(result);
            } else {
                console.log('Get sent mail info isss', info);
                result = {
                    success: true,
                    error: false,
                    statusCode: 200,
                    message: 'OTP sent to mail successful',
                    data: Number(otpCode)
                }
                return response.status(200).json(result);
            }
        });
    } catch (error) {
        console.log('Error at try catch API result', error);
        result = {
            success: false,
            error: true,
            statusCode: 500,
            message: message || 'Error at try catch API result',
            data: []
        }
        return response.status(200).json(result);
    }
}

module.exports = {
    sendOtpToMail
}
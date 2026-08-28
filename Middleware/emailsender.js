const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });

const sendEmail = async (to, subject, text, attachment) => {
    const mailOptions = { from: process.env.EMAIL_USER, to: to, subject: subject, text: text, attachments: attachment ? [{ filename: attachment.filename, path: attachment.path }] : [] };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendEmail };
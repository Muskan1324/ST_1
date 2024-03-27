
const express = require('express');
const nodemailer = require('nodemailer');
const generateOTP = require('./generateOTP');
require('dotenv').config();

const app = express();
app.use(express.json());            //everything goes in form of string and we want it to convert into JSon format
let sentOTP=null;
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'muskan0904.be21@chitkara.edu.in',
        // pass: process.env.PASS,
        pass: process.env.APP_PASS
    }
});

app.post('/sendOTP', (req, res) => {
    const email = req.body.email;
    const OTP = generateOTP();
    sentOTP=OTP;
    const mail = {
        to: email,
        from: 'muskan0904.be21@chitkara.edu.in',
        subject: 'OTP',
        text: `Your OTP is: ${OTP}`
    };

    transporter.sendMail(mail, (error) => {
        if (error) {
            res.status(500).json({ message: 'Failed to send OTP' });
        } else {
            res.status(200).json({ message: 'OTP sent successfully' });
        }
    });
});

app.get('/sendOTP',(req,res) => {
    res.sendFile(__dirname + '/index.html');
})
app.post('/verifyOTP', (req, res) => {
    const otp = req.body.otp;
   
    if (otp === sentOTP) {
        res.status(200).json({ message: 'Email verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});


app.listen(3000,()=>{
    console.log("http://localhost:3000");
})


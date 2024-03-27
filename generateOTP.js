const otpGenerator = require('otp-generator');
const generateOTP =()=>{
    const otp=otpGenerator.generate(4,{
        lowerCaseAlphabets:false,
        specialChars:false,
        upperCaseAlphabets:false
    });
    return otp;
};
module.exports = generateOTP;
const nodemailer = require('nodemailer');
const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
	let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },
        tls: {
            rejectUnauthorized: false
        },
    });
    let mailOption = {
        from: 'MERN <info@teamrabbil.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };
    return await transporter.sendMail(mailOption)
}
module.exports = EmailSend;
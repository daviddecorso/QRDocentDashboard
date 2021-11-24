import { failure, success } from '../api/utility/responseObject';
import nodemailer from 'nodemailer';

module.exports = async(req, res) => {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const museumName = req.body.museumName;

    // Optional
    const message = typeof req.body.message === 'undefined' ? '' : req.body.message;

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',

            // host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        await transporter.sendMail({
            from: 'QR Docent Notifications <' + process.env.NODEMAILER_EMAIL + '>',
            to: process.env.QRDOCENT_OWNER_EMAIL,
            subject: 'A museum would like to register for QR Docent',
            text: '',
            html: `
                <p>The following client has requested to register their museum for QR Docent:</p>
                <ul>
                    <li>Name: ${name}</li>
                    <li>Phone Number: ${phoneNumber}</li>
                    <li>Email: ${email}</li>
                    <li>Museum Name: ${museumName}</li>
                </ul>
                <p>Message (optional):</p>
                <p>${message}</p>
                `
        });
    } catch (error) {
        console.log(error);

        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .send(JSON.stringify(failure(error.message)));

        return;
    }

    res.status(200).setHeader('Content-Type', 'application/json').send(JSON.stringify(success()));
};

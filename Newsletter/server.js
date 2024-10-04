const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000; 

app.use(cors()); 
app.use(bodyParser.json()); 


const EMAIL_USER = 'shrijithn2004@gmail.com'; 
const EMAIL_PASS = 'opgj xoxf ppsl afwp'; 


app.post('/api/subscribe', (req, res) => {
    const { email } = req.body; 

    
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: 'Welcome to DEV@Deakin!',
        text: 'Thank you for subscribing to our newsletter!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Subscription successful!');
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

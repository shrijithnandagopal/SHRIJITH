const express = require('express');
const bodyParser = require('body-parser');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;



const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'shrijith',
  key: process.env.MAILGUN_API_KEY || '5f0af7a4a1a5c4012dcd3bbe4bed4f43-afce6020-d3b14994'
});


app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  
  const msg = {
    from: "shrijithn2004@gmail.com",
    to: email,
    subject: "Welcome to DEV@Deakin!",
    text: "Thank you for subscribing to our platform.",
    html: "<strong>Thank you for subscribing to our platform.</strong>"
  };

  try {
    await mg.messages.create('sandbox0d81da7d13304b88bb1de76ed69acee0.mailgun.org', msg);
    res.status(200).send('Subscription successful!');
  } catch (error) {
    console.error('Error in subscription:', error.message || error);
    res.status(500).send('Error in subscription');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

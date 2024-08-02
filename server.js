const express = require('express');
const bodyParser = require('body-parser');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const app = express();
const port = 3000;

// Mailgun configuration
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'shrijith',
  key: process.env.MAILGUN_API_KEY || 'afce6020-3c5c5f6f'
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  
  const msg = {
    from: "s224742799@deakin.edu.au",
    to: email,
    subject: "Welcome to DEV@Deakin!",
    text: "Thank you for subscribing to our platform.",
    html: "<strong>Thank you for subscribing to our platform.</strong>"
  };

  try {
    await mg.messages.create('sandbox0d81da7d13304b88bb1de76ed69acee0.mailgun.org', msg);
    res.status(200).send('Subscription successful!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in subscription');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
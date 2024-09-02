const express = require('express');
const bodyParser = require('body-parser');
const { Twilio } = require('twilio');
const path = require('path');
const app = express();
const PORT = 3000;

// Twilio credentials
const accountSid = 'AC0b3f294dc5f105b57110cb14239b9266';
const authToken = '48e74042eedd64016ce212d1a086879c';
const client = new Twilio(accountSid, authToken);

// Serve static files from the "assets" directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/leaderboard', (req, res) => {
    console.log('Received request for /leaderboard');
    res.sendFile(path.join(__dirname, 'public', 'leaderboard.html'));
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Endpoint to send SMS
app.post('/send-sms', (req, res) => {
    sendSmsMessage(req.body.to, req.body.body)
        .then(message => res.status(200).json({ sid: message.sid }))
        .catch(error => res.status(500).json({ error: error.message }));
});

// Function to send SMS
function sendSmsMessage(to, body) {
    return client.messages.create({
        from: '+13344639568', // Replace with your Twilio phone number
        body,
        to
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

const corsOptions = {
    origin: 'https://h0useh0ld-ch0r3z.web.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};

app.use(cors(corsOptions));

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

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

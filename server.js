const express = require('express');
const app = express();
const PORT = 3000;

let receivedUrl = null; // Variable to store the ngrok URL

app.use(express.json());

// Route to receive the ngrok URL via POST
app.post('/', (req, res) => {
    receivedUrl = req.body.ngrok_url;  // Save the ngrok_url from the JSON payload
    console.log(`Received ngrok URL: ${receivedUrl}`);
    res.status(200).send('URL received');
});

// Route to redirect to the received URL
app.get('/go', (req, res) => {
    if (receivedUrl) {
        res.redirect(receivedUrl);  // Redirect to the saved ngrok URL
    } else {
        res.status(404).send('No URL received yet.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

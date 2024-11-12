const express = require('express');
const app = express();
const PORT = 3000;

let receivedUrl = null;

app.use(express.json());

app.post('/', (req, res) => {
    receivedUrl = req.body.ngrok_url;
    console.log(`Received ngrok URL: ${receivedUrl}`);
    res.status(200).send('URL received');
});

app.get('/go', (req, res) => {
    if (receivedUrl) {
        res.redirect(receivedUrl);
    } else {
        res.status(404).send('No URL received yet.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');  // Import CORS
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());  // This enables CORS for all domains. You can specify an origin if needed

// Function to encode a text to Base64
function encodeTextToBase64(text) {
    return Buffer.from(text).toString('base64');  // Convert text to Base64 encoded string
}

// Serve coded text (Base64 encoded message)
app.get('/', (req, res) => {
    // The message you want to send as coded text
    const message = 'This is a coded message!';
    
    // Convert the message to Base64 encoding
    const codedMessage = encodeTextToBase64(message);
    
    // Send the coded message as the response
    res.send(codedMessage);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

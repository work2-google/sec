const express = require('express');
const cors = require('cors');  // Import CORS
const crypto = require('crypto');  // Built-in crypto module for encryption
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());  // This enables CORS for all domains. You can specify an origin if needed

// Secret key for AES encryption (make sure to use a secure key in production)
const SECRET_KEY = crypto.createHash('sha256').update('justmadeit').digest();  // 32-byte key
const ALGORITHM = 'aes-256-cbc';

// Function to encrypt HTML content using AES encryption
function aesEncrypt(text) {
    const iv = crypto.randomBytes(16);  // Generate a random initialization vector (IV)
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return iv.toString('base64') + ':' + encrypted;  // Return IV and encrypted text
}

// Serve encrypted HTML content
app.get('/', (req, res) => {
    // Your HTML content
    const htmlContent = `
        <html>
            <head><title>Encrypted Page</title></head>
            <body>
                <h1>This is a secure page</h1>
                <p>This content is encrypted before being sent to the client.</p>
            </body>
        </html>
    `;
    
    // Encrypt the HTML content
    const encryptedHtml = aesEncrypt(htmlContent);

    // Send the encrypted content as the response
    res.send(encryptedHtml);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

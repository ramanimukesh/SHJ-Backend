const http = require('http');

function healthCheck() {
    // Perform the health check
    http.get('http://localhost:5000/healthCheck', (res) => {
        console.log(`Health check at ${new Date().toISOString()} and response: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error(`Health check at ${new Date().toISOString()} and failed: ${err.message}`);
    });

    // Schedule the next health check after 10 minutes (600,000 ms)
    setTimeout(healthCheck, 600000); // 10 minutes  600000
}

// Export the function so it can be imported in app.js
module.exports = healthCheck;
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" }); // load .env variables

// Start server
const port = process.env.PORT || 8002;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});

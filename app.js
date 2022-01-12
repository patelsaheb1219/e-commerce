// Import Modules
const express = require('express');
const app = express();
const dotenv = require('dotenv');


dotenv.config({ path: "./config/config.env" })

// Port Number
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is started at http://localhost:${port}`);
});
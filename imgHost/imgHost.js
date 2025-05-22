const express = require('express');
const path = require('path');

const app = express();

// This serves files from ./public
app.use(express.static(path.join(__dirname, 'public')));

app.listen(5353, () => {
  console.log('Server running at http://localhost:5353');
});
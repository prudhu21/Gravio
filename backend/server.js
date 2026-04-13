const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/notes', notesRoutes);
app.use('/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
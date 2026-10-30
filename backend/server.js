const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// Enable CORS for all routes so the frontend can hit the public IP
app.use(cors({ origin: '*' }));
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://mongo-svc:27017/visiospark';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Cluster Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend REST API online on port ${PORT}`));
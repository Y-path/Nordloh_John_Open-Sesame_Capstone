require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurantRoutes');



const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('Open-Sesame! Doorway is open.');
  });

app.use('/api/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
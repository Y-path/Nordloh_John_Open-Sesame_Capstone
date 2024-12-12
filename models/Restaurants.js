const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    hours: { type: String, required: true },
})

module.exports = mongoose.model('Restaurant', restaurantSchema);

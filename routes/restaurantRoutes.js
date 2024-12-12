const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();


// POST to add a restaurant

router
    .post('/', async (req, res) => {
        try {
            const { name, cuisine, address, phone, hours } = req.body;

            if (!name || !cuisine || !hours) {
                return res.status(400).json({ message: 'Restaurant Name, Cuisine, and Hours required' });
            }

            const newRestaurant = new Book({
                id: Restaurant.length + 1,
                name,
                cuisine,
                address,
                phone,
                hours,

            });

            await newRestaurant.save();

            res.status(201).json(newRestaurant);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

// GET all restaurants

router
    .get('/', async (req, res) => {
        try {
            const restaurants = await Restaurant.find();
            res.status(200).json(restaurants);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

// GET a specific restaurant

router
    .get('/restaurant/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const restaurant = await Restaurant.findById(id);
            if (!restaurant) {
                return res.status(404).json({ message: 'No restaurant found' });
            }
            res.status(200).json(restaurant);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

// PUT to update a restaurant

router
    .put('/restaurant/:id', async (req, res) => {
        const { id } = req.params;
        const { name, cuisine, address, phone, hours } = req.body;

        try {
            const updatedRestaurant = await Restaurant.findOneAndUpdate({ _id: id },

                { name, cuisine, address, phone, hours },
                { new: true }
            );

            if (!updatedRestaurant) {
                return res.status(404).json({ message: 'No restaurant found' });
            }

            res.status(200).json(updatedRestaurant);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

// DELETE a restaurant

router
    .delete('/restaurant/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const deletedRestaurant = await Restaurant.findOneAndDelete({ _id: id });
            if (!deletedRestaurant) {
                return res.status(404).json({ message: 'No restaurant found' });
            }
            res.status(200).json({ message: 'Restaurant deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    });

module.exports = router;
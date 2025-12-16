const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const adminMiddleware = require('../middleware/adminMiddleware');

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/categories
// @desc    Create a new category
// @access  Admin only
router.post('/', adminMiddleware, async (req, res) => {
    try {
        const { name } = req.body;

        // Validation
        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Create category
        const category = await Category.create({ name });

        return res.status(201).json({
            message: 'Category created successfully',
            category
        });
    } catch (err) {
        console.error('Error creating category:', err);
        return res.status(500).json({ message: 'Failed to create category' });
    }
});

module.exports = router;

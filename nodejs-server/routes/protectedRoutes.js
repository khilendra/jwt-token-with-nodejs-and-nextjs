const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');
const authController = require('../controllers/authController');

router.get('/verify', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

// User a new profile
router.get('/user', authMiddleware, authController.user);

// Create a new profile
router.post('/profile', authMiddleware, profileController.createProfile);

// Get a profile
router.get('/profile', authMiddleware, profileController.getProfile);

// Update a profile
router.put('/profile', authMiddleware, profileController.updateProfile);

// Delete a profile
router.delete('/profile', authMiddleware, profileController.deleteProfile);


module.exports = router;

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/register', usersController.register);
router.get('/me', usersController.profile);

module.exports = router;
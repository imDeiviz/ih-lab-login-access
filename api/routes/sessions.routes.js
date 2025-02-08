const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessions.controller');

router.post('/', sessionsController.create);


module.exports = router;

const express = require('express');
const router = express.Router();
const {getSummary, authorizeUser} = require('../controllers/customerControllers');
const { authenticateToken} = require('../middleware/protectRoutes');


router.get('/authorize/:userId', authorizeUser);


router.get('/:customerId/summary',authenticateToken ,getSummary);

module.exports = router;
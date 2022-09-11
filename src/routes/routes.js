const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const addCreditCardSchemas = require('../schema/add-credit-card-schema');
const addCreditCard = require('../controllers/addCreditCard');
const getCreditCardSchemas = require('../schema/get-credit-card-schema');
const getCreditCard = require('../controllers/getCreditCard');

router.post('/api/v1/payments', authMiddleware(), validationMiddleware(addCreditCardSchemas), addCreditCard());
router.get('/api/v1/payments', authMiddleware(), validationMiddleware(getCreditCardSchemas), getCreditCard());

module.exports = router;

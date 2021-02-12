const express = require('express');

const router = express.Router();
const {getAllPayment, createPayment } = require('./../controllers/paymentController')

router.get('/',getAllPayment )
router.post('/create', createPayment)

module.exports = router

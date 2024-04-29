//For creating a express router for the razorpay implementation.

import express from 'express';
import { checkout, paymentVerification } from '../controllers/paymentController.js';

const router= express.Router();

router.route('/checkout').post(checkout);
router.route('/paymentverification').post(paymentVerification);

export default router;
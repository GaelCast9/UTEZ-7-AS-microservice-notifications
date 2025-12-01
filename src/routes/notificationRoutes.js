const express = require('express');
const router = express.Router();
const controller = require('../controllers/notificationController');

router.post('/welcome', controller.sendWelcomeEmail);
router.post('/ticket', controller.sendTicketEmail);
router.post('/promotion', controller.sendPromotionEmail);
router.post('/contact', controller.sendContactMessage); 

module.exports = router;
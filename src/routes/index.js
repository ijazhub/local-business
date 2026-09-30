const router = require('express').Router();
const business = require('../controllers/business.controller');
const customer = require('../controllers/customer.controller');
const booking = require('../controllers/booking.controller');

router.get('/categories', business.listCategories);

router.post('/businesses', business.onboard);
router.get('/businesses', business.listAll);
router.get('/businesses/category/:category', business.listByCategory);

router.get('/services', business.listServices);

router.post('/customers', customer.create);

router.post('/bookings', booking.book);
router.get('/bookings/:id', booking.getById);
router.patch('/bookings/:id/cancel', booking.cancel);

module.exports = router;

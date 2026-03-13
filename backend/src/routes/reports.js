const express = require('express');
const router = express.Router();
const {
  validateOrderQuery,
  validateTicketQuery,
  validateSalesQuery,
  validateOrdersByDay,
} = require('../middlewares/validateQuery');
const { ordersReport } = require('../controllers/ordersController');
const { supportReport } = require('../controllers/supportController');
const {
  salesCategoryReport,
  ordersByDayReport,
} = require('../controllers/salesController');

router.get('/orders', validateOrderQuery, ordersReport);
router.get('/support-tickets', validateTicketQuery, supportReport);
router.get('/sales-by-category', validateSalesQuery, salesCategoryReport);
router.get('/orders-by-day', validateOrdersByDay, ordersByDayReport);

module.exports = router;

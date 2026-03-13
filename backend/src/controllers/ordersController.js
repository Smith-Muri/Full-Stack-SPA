const { getOrders } = require('../services/ordersService');

async function ordersReport(req, res, next) {
  try {
    const { data, total } = await getOrders(req.query);
    res.json({ success: true, data, total });
  } catch (err) {
    next(err);
  }
}

module.exports = { ordersReport };

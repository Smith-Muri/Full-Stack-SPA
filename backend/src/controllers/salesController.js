const { salesByCategory, ordersByDay } = require('../services/salesService');

async function salesCategoryReport(req, res, next) {
  try {
    const data = await salesByCategory(req.query);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

async function ordersByDayReport(req, res, next) {
  try {
    const data = await ordersByDay(req.query);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

module.exports = { salesCategoryReport, ordersByDayReport };

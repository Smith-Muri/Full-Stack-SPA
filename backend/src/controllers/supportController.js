const { getTickets } = require('../services/supportService');

async function supportReport(req, res, next) {
  try {
    const { data, total } = await getTickets(req.query);
    res.json({ success: true, data, total });
  } catch (err) {
    next(err);
  }
}

module.exports = { supportReport };

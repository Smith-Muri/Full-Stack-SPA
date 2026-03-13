const { z } = require('zod');

// schemas for query validation
const orderQuerySchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.string().optional(),
  city: z.string().optional(),
  page: z.preprocess((v) => parseInt(v), z.number().int().positive()).optional(),
  limit: z.preprocess((v) => parseInt(v), z.number().int().positive()).optional(),
  sortBy: z.enum(['fecha', 'total']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

const ticketQuerySchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  ticketCategory: z.string().optional(),
  page: z.preprocess((v) => parseInt(v), z.number().int().positive()).optional(),
  limit: z.preprocess((v) => parseInt(v), z.number().int().positive()).optional(),
});

const salesQuerySchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  city: z.string().optional(),
  status: z.string().optional(),
});

const ordersByDaySchema = salesQuerySchema;

function validateQuery(schema) {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req.query);
      req.query = parsed;
      next();
    } catch (err) {
      err.status = 400;
      next(err);
    }
  };
}

module.exports = {
  validateOrderQuery: validateQuery(orderQuerySchema),
  validateTicketQuery: validateQuery(ticketQuerySchema),
  validateSalesQuery: validateQuery(salesQuerySchema),
  validateOrdersByDay: validateQuery(ordersByDaySchema),
};

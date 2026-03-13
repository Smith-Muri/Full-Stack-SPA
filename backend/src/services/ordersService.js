const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getPagination } = require('../utils/pagination');

async function getOrders(filters) {
  const {
    startDate,
    endDate,
    status,
    city,
    page = 1,
    limit = 10,
    sortBy = 'order_date',
    sortOrder = 'asc',
  } = filters;

  const where = {};
  if (startDate || endDate) {
    where.order_date = {};
    if (startDate) where.order_date.gte = new Date(startDate);
    if (endDate) where.order_date.lte = new Date(endDate);
  }
  if (status) where.status = status;
  if (city) where.customers = { city };

  const orderBy = {};
  orderBy[sortBy === 'order_date' ? 'order_date' : 'created_at'] = sortOrder;

  const { take, skip } = getPagination(page, limit);

  const [data, total] = await Promise.all([
    prisma.orders.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { customers: true },
    }),
    prisma.orders.count({ where }),
  ]);

  return { data, total };
}

module.exports = { getOrders };

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getPagination } = require('../utils/pagination');

async function getTickets(filters) {
  const {
    startDate,
    endDate,
    status,
    priority,
    ticketCategory,
    page = 1,
    limit = 10,
  } = filters;

  const where = {};
  if (startDate || endDate) {
    where.created_at = {};
    if (startDate) where.created_at.gte = new Date(startDate);
    if (endDate) where.created_at.lte = new Date(endDate);
  }
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (ticketCategory) where.category = ticketCategory;

  const { take, skip } = getPagination(page, limit);

  const [data, total] = await Promise.all([
    prisma.support_tickets.findMany({
      where,
      skip,
      take,
      include: { customers: true },
    }),
    prisma.support_tickets.count({ where }),
  ]);

  return { data, total };
}

module.exports = { getTickets };

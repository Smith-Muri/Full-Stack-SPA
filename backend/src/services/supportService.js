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
    where.fecha = {};
    if (startDate) where.fecha.gte = new Date(startDate);
    if (endDate) where.fecha.lte = new Date(endDate);
  }
  if (status) where.estado = status;
  if (priority) where.prioridad = priority;
  if (ticketCategory) where.categoria = ticketCategory;

  const { take, skip } = getPagination(page, limit);

  const [data, total] = await Promise.all([
    prisma.tickets_soporte.findMany({
      where,
      skip,
      take,
      include: { clientes: true },
    }),
    prisma.tickets_soporte.count({ where }),
  ]);

  return { data, total };
}

module.exports = { getTickets };

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
    sortBy = 'fecha',
    sortOrder = 'asc',
  } = filters;

  const where = {};
  if (startDate || endDate) {
    where.fecha = {};
    if (startDate) where.fecha.gte = new Date(startDate);
    if (endDate) where.fecha.lte = new Date(endDate);
  }
  if (status) where.estado = status;
  if (city) where.ciudad = city;

  const orderBy = {};
  orderBy[sortBy === 'fecha' ? 'fecha' : 'total'] = sortOrder;

  const { take, skip } = getPagination(page, limit);

  const [data, total] = await Promise.all([
    prisma.ordenes.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { clientes: true },
    }),
    prisma.ordenes.count({ where }),
  ]);

  return { data, total };
}

module.exports = { getOrders };

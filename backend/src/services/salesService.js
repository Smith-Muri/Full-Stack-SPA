const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function salesByCategory(filters) {
  const { startDate, endDate, city, status } = filters;
  const where = {};
  if (startDate || endDate) {
    where.order_date = {};
    if (startDate) where.order_date.gte = new Date(startDate);
    if (endDate) where.order_date.lte = new Date(endDate);
  }
  if (city) where.customers = { city };
  if (status) where.status = status;

  // Obtener todos los items con productos y categorías
  const items = await prisma.order_items.findMany({
    where: {
      orders: where,
    },
    include: {
      products: {
        include: { categories: true },
      },
    },
  });

  // Agrupar por categoría y sumar cantidad * precio
  const aggregated = {};
  items.forEach((item) => {
    const category = item.products.categories?.name || 'Sin categoría';
    const total = Number(item.unit_price) * Number(item.quantity);
    if (!aggregated[category]) aggregated[category] = 0;
    aggregated[category] += total;
  });

  return Object.entries(aggregated).map(([category, total]) => ({ category, total }));
}

async function ordersByDay(filters) {
  const { startDate, endDate, city, status } = filters;
  const where = {};
  if (startDate || endDate) {
    where.order_date = {};
    if (startDate) where.order_date.gte = new Date(startDate);
    if (endDate) where.order_date.lte = new Date(endDate);
  }
  if (city) where.customers = { city };
  if (status) where.status = status;

  const result = await prisma.orders.groupBy({
    by: ['order_date'],
    _count: { id: true },
    where,
  });

  // format date only
  return result.map((r) => ({
    date: r.order_date.toISOString().split('T')[0],
    orders: r._count.id,
  }));
}

module.exports = { salesByCategory, ordersByDay };

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function salesByCategory(filters) {
  const { startDate, endDate, city, status } = filters;
  const where = {};
  if (startDate || endDate) {
    where.fecha = {};
    if (startDate) where.fecha.gte = new Date(startDate);
    if (endDate) where.fecha.lte = new Date(endDate);
  }
  if (city) where.ciudad = city;
  if (status) where.estado = status;

  // join ordenes -> detalle_orden -> producto -> categoria
  const result = await prisma.detalle_orden.groupBy({
    by: ['producto_id'],
    _sum: { cantidad: true, precio_unitario: true },
    where: {
      ordenes: where,
    },
  });

  // fetch category names
  const data = await Promise.all(
    result.map(async (r) => {
      const producto = await prisma.productos.findUnique({
        where: { id: r.producto_id },
        include: { categorias: true },
      });
      return {
        category: producto.categorias.nombre,
        total: r._sum.precio_unitario || 0,
      };
    })
  );

  // aggregate by category
  const aggregated = {};
  data.forEach((d) => {
    if (!aggregated[d.category]) aggregated[d.category] = 0;
    aggregated[d.category] += d.total;
  });

  return Object.entries(aggregated).map(([category, total]) => ({ category, total }));
}

async function ordersByDay(filters) {
  const { startDate, endDate, city, status } = filters;
  const where = {};
  if (startDate || endDate) {
    where.fecha = {};
    if (startDate) where.fecha.gte = new Date(startDate);
    if (endDate) where.fecha.lte = new Date(endDate);
  }
  if (city) where.ciudad = city;
  if (status) where.estado = status;

  const result = await prisma.ordenes.groupBy({
    by: ['fecha'],
    _count: { id: true },
    where,
  });

  // format date only
  return result.map((r) => ({
    date: r.fecha.toISOString().split('T')[0],
    orders: r._count.id,
  }));
}

module.exports = { salesByCategory, ordersByDay };

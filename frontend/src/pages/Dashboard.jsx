import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import KPIs from '../components/KPIs';
import OrdersTable from '../components/OrdersTable';
import TicketsTable from '../components/TicketsTable';
import SalesChart from '../components/SalesChart';
import OrdersChart from '../components/OrdersChart';
import { useOrders, useTickets, useSalesByCategory, useOrdersByDay } from '../hooks/useReports';

export default function Dashboard() {
  const [filters, setFilters] = useState({});

  const ordersQuery = useOrders(filters);
  const ticketsQuery = useTickets(filters);
  const salesQuery = useSalesByCategory(filters);
  const ordersDayQuery = useOrdersByDay(filters);

  const totalSales = useMemo(() => {
    // ensure totals are numbers (Prisma returns strings for decimals)
    return (
      ordersQuery.data?.data?.reduce(
        (sum, o) => sum + parseFloat(o.total || 0),
        0
      ) || 0
    );
  }, [ordersQuery.data]);

  const totalOrders = ordersQuery.data?.total || 0;
  // Guardar contra arrays indefinidos para evitar crashes iniciales
  const openTickets = ticketsQuery.data?.data
    ? ticketsQuery.data.data.filter(t => t.estado === 'Abierto').length
    : 0;

  // show both tables side-by-side like the sketch
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-6 max-w-7xl mx-auto">
        <KPIs totalSales={totalSales} totalOrders={totalOrders} openTickets={openTickets} />
        <Filters filters={filters} setFilters={setFilters} />

        {/* two tables row */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrdersTable data={ordersQuery.data?.data || []} loading={ordersQuery.isLoading} />
          <TicketsTable data={ticketsQuery.data?.data || []} loading={ticketsQuery.isLoading} />
        </div>

        {/* charts below tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <SalesChart
            data={salesQuery.data?.data || []}
            loading={salesQuery.isLoading}
            onBarClick={(d) => alert(`Category ${d.category}: ${d.total}`)}
          />
          <OrdersChart
            data={ordersDayQuery.data?.data || []}
            loading={ordersDayQuery.isLoading}
          />
        </div>
      </div>
    </div>
  );
}

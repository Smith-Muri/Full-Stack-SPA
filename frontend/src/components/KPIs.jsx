import React from 'react';

export default function KPIs({ totalSales, totalOrders, openTickets }) {
  const formatCurrency = (v) => {
    try { return v.toFixed(2); } catch(e){ return v; }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="p-6 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg rounded text-white">
        <h3 className="text-lg font-semibold">Total Ventas</h3>
        <p className="text-2xl font-bold">${formatCurrency(totalSales)}</p>
      </div>
      <div className="p-6 bg-gradient-to-r from-green-400 to-green-600 shadow-lg rounded text-white">
        <h3 className="text-lg font-semibold">Total Órdenes</h3>
        <p className="text-2xl font-bold">{totalOrders}</p>
      </div>
      <div className="p-6 bg-gradient-to-r from-red-400 to-red-600 shadow-lg rounded text-white">
        <h3 className="text-lg font-semibold">Tickets Abiertos</h3>
        <p className="text-2xl font-bold">{openTickets}</p>
      </div>
    </div>
  );
}

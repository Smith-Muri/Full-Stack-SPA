import React from 'react';
import { CSVLink } from 'react-csv';

export default function OrdersTable({ data, loading, page, setPage, total }) {
  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  const headers = [
    { label: 'Número', key: 'id' },
    { label: 'Fecha', key: 'fecha' },
    { label: 'Cliente', key: 'clientes.nombre' },
    { label: 'Ciudad', key: 'ciudad' },
    { label: 'Estado', key: 'estado' },
    { label: 'Total', key: 'total' },
  ];

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="bg-white shadow p-4 mb-4 rounded">
      <div className="flex justify-between mb-2">
        <span className="font-semibold">Órdenes</span>
        <CSVLink data={data} headers={headers} filename="ordenes.csv" className="text-blue-600 text-sm hover:underline">
          Exportar CSV
        </CSVLink>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Ciudad</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((o) => (
              <tr key={o.id} className="border-t hover:bg-gray-50 cursor-pointer">
                <td className="p-2">{o.id}</td>
                <td className="p-2">{new Date(o.order_date).toLocaleDateString()}</td>
                <td className="p-2">{o.customers?.full_name}</td>
                <td className="p-2">{o.customers?.city}</td>
                <td className="p-2">{o.status}</td>
                <td className="p-2">{o.total ?? (o.order_items?.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0) || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-2">
        <button
          className="px-2 py-1 border rounded mr-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button
          className="px-2 py-1 border rounded ml-2"
          disabled={page === totalPages || data.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

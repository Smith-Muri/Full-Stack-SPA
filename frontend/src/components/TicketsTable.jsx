import React from 'react';

export default function TicketsTable({ data, loading }) {
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

  return (
    <div className="bg-white shadow p-4 mb-4 rounded">
      <span className="font-semibold">Tickets</span>
      <div className="overflow-x-auto mt-2">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Fecha</th>
            <th className="p-2">Cliente</th>
            <th className="p-2">Categoria</th>
            <th className="p-2">Prioridad</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Agente</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t) => (
            <tr key={t.id} className="border-t hover:bg-gray-50 cursor-pointer">
              <td className="p-2">{new Date(t.created_at).toLocaleDateString()}</td>
              <td className="p-2">{t.customers?.full_name}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2">{t.priority}</td>
              <td className="p-2">{t.status}</td>
              <td className="p-2">{t.agent}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

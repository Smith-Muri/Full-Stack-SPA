import React from 'react';

export default function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setFilters({});
  };

  return (
    <div className="bg-white p-4 shadow-md rounded mb-4">
      <div className="flex flex-wrap gap-4">
        <input type="date" name="startDate" value={filters.startDate || ''} onChange={handleChange} className="border rounded p-2 w-40" placeholder="Fecha inicio" />
        <input type="date" name="endDate" value={filters.endDate || ''} onChange={handleChange} className="border rounded p-2 w-40" placeholder="Fecha fin" />
        <input type="text" name="city" value={filters.city || ''} onChange={handleChange} className="border rounded p-2 w-40" placeholder="Ciudad" />
        <input type="text" name="status" value={filters.status || ''} onChange={handleChange} className="border rounded p-2 w-40" placeholder="Estado" />
        <input type="text" name="priority" value={filters.priority || ''} onChange={handleChange} className="border rounded p-2 w-40" placeholder="Prioridad" />
        <input type="text" name="ticketCategory" value={filters.ticketCategory || ''} onChange={handleChange} className="border rounded p-2 w-40" placeholder="Categoria ticket" />
      </div>
      <button onClick={reset} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Reset filters</button>
    </div>
  );
}

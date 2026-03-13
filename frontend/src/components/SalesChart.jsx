import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesChart({ data, loading, onBarClick }) {
  if (loading) return <div className="p-4">Cargando gráfico...</div>;
  return (
    <div className="bg-white shadow p-4 mb-4 h-64 rounded">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} onClick={(e) => { if (onBarClick && e && e.activePayload) { onBarClick(e.activePayload[0].payload); } }}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

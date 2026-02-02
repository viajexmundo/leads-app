"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LeadsByCategoryChartProps {
  data: Record<string, number>;
}

export default function LeadsByCategoryChart({
  data,
}: LeadsByCategoryChartProps) {
  const chartData = Object.entries(data)
    .map(([name, value]) => ({
      name,
      leads: value,
    }))
    .sort((a, b) => b.leads - a.leads);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Leads por Categoría/Fase
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="leads" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

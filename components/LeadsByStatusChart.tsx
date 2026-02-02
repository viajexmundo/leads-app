"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface LeadsByStatusChartProps {
  data: Record<string, number>;
}

const COLORS = {
  Ganado: "#10b981",
  "En Proceso": "#3b82f6",
  Perdido: "#ef4444",
  Nuevo: "#8b5cf6",
  Contactado: "#f59e0b",
  Cotizado: "#06b6d4",
  Negociación: "#ec4899",
  Vendido: "#10b981",
  Cancelado: "#6b7280",
};

export default function LeadsByStatusChart({ data }: LeadsByStatusChartProps) {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Distribución por Estado
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name as keyof typeof COLORS] || "#64748b"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

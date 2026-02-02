"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { WeeklyData } from "@/lib/types/notion";

interface WeeklyTrendChartProps {
  data: WeeklyData[];
}

export default function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
  // Preparar datos para el gráfico
  const chartData = data.map((week) => ({
    semana: week.weekLabel,
    "Total Leads": week.totalLeads,
    "Ganados": week.ganados,
    "Perdidos": week.perdidos,
    "En Proceso": week.enProceso,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        📈 Tendencia de Leads (Últimas 8 Semanas)
      </h3>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No hay datos de tendencia disponibles
        </p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="semana"
                tick={{ fontSize: 12 }}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: '20px',
                }}
              />
              <Line
                type="monotone"
                dataKey="Total Leads"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5, fill: '#3b82f6' }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="Ganados"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4, fill: '#10b981' }}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="Perdidos"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4, fill: '#ef4444' }}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="En Proceso"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4, fill: '#f59e0b' }}
                strokeDasharray="3 3"
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Resumen de la semana actual */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data[data.length - 1] && (
                <>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Esta Semana</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {data[data.length - 1].totalLeads}
                    </p>
                    <p className="text-xs text-gray-500">leads totales</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Ganados</p>
                    <p className="text-2xl font-bold text-green-600">
                      {data[data.length - 1].ganados}
                    </p>
                    <p className="text-xs text-gray-500">
                      {data[data.length - 1].totalLeads > 0
                        ? `${((data[data.length - 1].ganados / data[data.length - 1].totalLeads) * 100).toFixed(0)}%`
                        : '0%'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Perdidos</p>
                    <p className="text-2xl font-bold text-red-600">
                      {data[data.length - 1].perdidos}
                    </p>
                    <p className="text-xs text-gray-500">
                      {data[data.length - 1].totalLeads > 0
                        ? `${((data[data.length - 1].perdidos / data[data.length - 1].totalLeads) * 100).toFixed(0)}%`
                        : '0%'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">En Proceso</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {data[data.length - 1].enProceso}
                    </p>
                    <p className="text-xs text-gray-500">
                      {data[data.length - 1].totalLeads > 0
                        ? `${((data[data.length - 1].enProceso / data[data.length - 1].totalLeads) * 100).toFixed(0)}%`
                        : '0%'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

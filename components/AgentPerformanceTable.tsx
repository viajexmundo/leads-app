"use client";

import { AgentMetrics } from "@/lib/types/notion";

interface AgentPerformanceTableProps {
  agents: AgentMetrics[];
}

export default function AgentPerformanceTable({ agents }: AgentPerformanceTableProps) {
  if (agents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          👥 Rendimiento por Agente
        </h3>
        <p className="text-gray-500 text-center py-8">
          No hay datos de agentes disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        👥 Rendimiento por Agente
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Agente
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                Total Leads
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                ✅ Ganados
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                ❌ Perdidos
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                🔄 En Proceso
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                📊 Conversión
              </th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {agent.agentName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{agent.agentName}</p>
                      <p className="text-xs text-gray-500">
                        {agent.totalLeads} lead{agent.totalLeads !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {agent.totalLeads}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-semibold text-green-600">
                      {agent.leadsGanados}
                    </span>
                    <span className="text-xs text-gray-500">
                      {agent.totalLeads > 0
                        ? `${((agent.leadsGanados / agent.totalLeads) * 100).toFixed(0)}%`
                        : '0%'}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-semibold text-red-600">
                      {agent.leadsPerdidos}
                    </span>
                    <span className="text-xs text-gray-500">
                      {agent.totalLeads > 0
                        ? `${((agent.leadsPerdidos / agent.totalLeads) * 100).toFixed(0)}%`
                        : '0%'}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-semibold text-blue-600">
                      {agent.leadsEnProceso}
                    </span>
                    <span className="text-xs text-gray-500">
                      {agent.totalLeads > 0
                        ? `${((agent.leadsEnProceso / agent.totalLeads) * 100).toFixed(0)}%`
                        : '0%'}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xl font-bold text-purple-600">
                      {agent.conversionRate.toFixed(1)}%
                    </span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                        style={{ width: `${Math.min(agent.conversionRate, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resumen final */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Agentes</p>
            <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Leads</p>
            <p className="text-2xl font-bold text-gray-900">
              {agents.reduce((sum, a) => sum + a.totalLeads, 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Mejor Conversión</p>
            <p className="text-2xl font-bold text-green-600">
              {agents.length > 0
                ? `${Math.max(...agents.map((a) => a.conversionRate)).toFixed(1)}%`
                : '0%'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Promedio Conversión</p>
            <p className="text-2xl font-bold text-blue-600">
              {agents.length > 0
                ? `${(agents.reduce((sum, a) => sum + a.conversionRate, 0) / agents.length).toFixed(1)}%`
                : '0%'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

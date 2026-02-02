"use client";

import { useEffect, useState } from "react";
import MetricsGrid from "./MetricsGrid";
import LeadsByStatusChart from "./LeadsByStatusChart";
import LeadsByCategoryChart from "./LeadsByCategoryChart";
import TopDestinationsTable from "./TopDestinationsTable";
import { LeadMetrics } from "@/lib/types/notion";

export default function Dashboard() {
  const [metrics, setMetrics] = useState<LeadMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch("/api/metrics");
        const result = await response.json();

        if (result.success) {
          setMetrics(result.data);
        }
      } catch (err) {
        console.error("Error al cargar métricas:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🌍 ViajeXMundo
              </h1>
              <p className="text-gray-600 mt-1">Dashboard de Leads y KPIs</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                🔄 Actualizar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* KPIs Grid */}
        <div className="mb-8">
          <MetricsGrid />
        </div>

        {/* Charts Section */}
        {metrics && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <LeadsByStatusChart data={metrics.leadsByStatus} />
              <LeadsByCategoryChart data={metrics.leadsByCategory} />
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Top Destinations */}
              <TopDestinationsTable destinations={metrics.topDestinations} />

              {/* Leads by Assignee */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  👥 Leads por Asesor
                </h3>
                {Object.keys(metrics.leadsByAssignee).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No hay datos de asesores disponibles
                  </p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(metrics.leadsByAssignee)
                      .sort(([, a], [, b]) => b - a)
                      .map(([name, count], index) => {
                        const total = Object.values(
                          metrics.leadsByAssignee
                        ).reduce((sum, c) => sum + c, 0);
                        const percentage = ((count / total) * 100).toFixed(1);

                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">
                                  {name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {name || "Sin asignar"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {count} leads ({percentage}%)
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-gray-900">
                                {count}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>

            {/* Leads by Source */}
            {Object.keys(metrics.leadsBySource).length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  📊 Leads por Fuente
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.entries(metrics.leadsBySource)
                    .sort(([, a], [, b]) => b - a)
                    .map(([source, count], index) => (
                      <div
                        key={index}
                        className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
                      >
                        <p className="text-3xl font-bold text-blue-600 mb-1">
                          {count}
                        </p>
                        <p className="text-sm text-gray-600">{source}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>
            Dashboard de ViajeXMundo • Powered by Notion API • Actualizado en
            tiempo real
          </p>
        </div>
      </footer>
    </div>
  );
}

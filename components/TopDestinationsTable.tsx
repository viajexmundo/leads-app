"use client";

interface TopDestinationsTableProps {
  destinations: Array<{ destination: string; count: number }>;
}

export default function TopDestinationsTable({
  destinations,
}: TopDestinationsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        🌍 Top Destinos Solicitados
      </h3>
      {destinations.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No hay datos de destinos disponibles
        </p>
      ) : (
        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  #
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Destino
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Leads
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  %
                </th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest, index) => {
                const total = destinations.reduce((sum, d) => sum + d.count, 0);
                const percentage = ((dest.count / total) * 100).toFixed(1);

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {dest.destination}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">
                      {dest.count}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span>{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

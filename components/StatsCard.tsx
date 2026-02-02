interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "yellow" | "red" | "purple" | "indigo";
}

const colorClasses = {
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  green: "bg-green-50 text-green-600 border-green-200",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
  red: "bg-red-50 text-red-600 border-red-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = "blue",
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              <span
                className={`font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-gray-500 ml-2">vs mes anterior</span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

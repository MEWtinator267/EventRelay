import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

const statusColors = {
  SUCCESS: { fill: "#10b981", gradient: ["#10b981", "#34d399"] },
  FAILED: { fill: "#ef4444", gradient: ["#ef4444", "#f87171"] },
  PENDING: { fill: "#f59e0b", gradient: ["#f59e0b", "#fbbf24"] },
  DLQ: { fill: "#8b5cf6", gradient: ["#8b5cf6", "#a78bfa"] },
};

const DeliveryStatusChart = ({ data }) => {
  const { isDark } = useTheme();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.payload.status}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {item.value.toLocaleString()}
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">deliveries</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate total for percentage
  const total = data?.reduce((acc, curr) => acc + curr.count, 0) || 0;

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-500/5 to-emerald-500/5 dark:from-purple-500/10 dark:to-emerald-500/10 pointer-events-none"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Delivery Status
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Distribution breakdown</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{total.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total deliveries</p>
          </div>
        </div>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                {Object.entries(statusColors).map(([status, colors]) => (
                  <linearGradient key={status} id={`gradient-${status}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.gradient[0]} />
                    <stop offset="100%" stopColor={colors.gradient[1]} />
                  </linearGradient>
                ))}
              </defs>
              <XAxis 
                dataKey="status" 
                stroke={isDark ? "#6b7280" : "#9ca3af"}
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke={isDark ? "#6b7280" : "#9ca3af"}
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {data?.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#gradient-${entry.status})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          {data?.map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: statusColors[item.status]?.fill || '#6b7280' }}
              ></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {item.status}: <span className="font-semibold text-gray-900 dark:text-white">{item.count}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryStatusChart;
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

const ThroughputChart = ({ data }) => {
  const { isDark } = useTheme();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {payload[0].value.toLocaleString()}
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">events</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 pointer-events-none"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Event Throughput
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last 24 hours</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Events/hour</span>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? "#374151" : "#e5e7eb"} 
                vertical={false}
              />
              <XAxis 
                dataKey="hour" 
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
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="count"
                stroke="url(#strokeGradient)"
                strokeWidth={3}
                fill="url(#throughputGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ThroughputChart;
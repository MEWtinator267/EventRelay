const icons = {
  events: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  failed: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  webhooks: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  ),
  dlq: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
};

const colorConfig = {
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-500/20",
    icon: "text-blue-500 dark:text-blue-400",
    glow: "shadow-blue-500/20",
    border: "border-blue-500/20 dark:border-blue-500/30",
    gradient: "from-blue-500 to-cyan-500",
  },
  red: {
    bg: "bg-red-500/10 dark:bg-red-500/20",
    icon: "text-red-500 dark:text-red-400",
    glow: "shadow-red-500/20",
    border: "border-red-500/20 dark:border-red-500/30",
    gradient: "from-red-500 to-orange-500",
  },
  green: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    icon: "text-emerald-500 dark:text-emerald-400",
    glow: "shadow-emerald-500/20",
    border: "border-emerald-500/20 dark:border-emerald-500/30",
    gradient: "from-emerald-500 to-teal-500",
  },
  yellow: {
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    icon: "text-amber-500 dark:text-amber-400",
    glow: "shadow-amber-500/20",
    border: "border-amber-500/20 dark:border-amber-500/30",
    gradient: "from-amber-500 to-yellow-500",
  },
};

const DashboardCard = ({ title, value, icon, trend, color = "blue" }) => {
  const colors = colorConfig[color];
  const isPositive = trend?.startsWith("+");
  const isNegative = trend?.startsWith("-");

  return (
    <div className={`
      relative overflow-hidden
      bg-white dark:bg-gray-800/50 
      backdrop-blur-sm
      border ${colors.border}
      rounded-2xl p-6
      shadow-lg hover:shadow-xl ${colors.glow}
      transition-all duration-300 ease-out
      hover:-translate-y-1
      group
    `}>
      {/* Background gradient accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.gradient} opacity-5 dark:opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity`}></div>
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                isPositive 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' 
                  : isNegative 
                    ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}>
                {trend}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">vs last hour</span>
            </div>
          )}
        </div>
        
        <div className={`${colors.bg} ${colors.icon} p-3 rounded-xl`}>
          {icons[icon] || icons.events}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
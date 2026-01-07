const statusConfig = {
  ACTIVE: {
    bg: "bg-emerald-100 dark:bg-emerald-500/20",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
    pulse: true,
  },
  INACTIVE: {
    bg: "bg-gray-100 dark:bg-gray-700",
    text: "text-gray-600 dark:text-gray-400",
    dot: "bg-gray-400",
    pulse: false,
  },
};

const WebhookStatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.INACTIVE;

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}
    >
      <span className="relative flex h-2 w-2">
        {config.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dot} opacity-75`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`}></span>
      </span>
      {status}
    </span>
  );
};

export default WebhookStatusBadge;
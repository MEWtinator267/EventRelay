const DeliveryAttempt = ({ attempt, index, total }) => {
  const getStatusConfig = (status) => {
    switch (status?.toUpperCase()) {
      case 'SUCCESS':
        return {
          bg: 'bg-emerald-100 dark:bg-emerald-500/20',
          text: 'text-emerald-700 dark:text-emerald-400',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ),
          border: 'border-emerald-200 dark:border-emerald-500/30',
          glow: 'shadow-emerald-500/10'
        };
      case 'FAILED':
        return {
          bg: 'bg-red-100 dark:bg-red-500/20',
          text: 'text-red-700 dark:text-red-400',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ),
          border: 'border-red-200 dark:border-red-500/30',
          glow: 'shadow-red-500/10'
        };
      case 'DLQ':
        return {
          bg: 'bg-orange-100 dark:bg-orange-500/20',
          text: 'text-orange-700 dark:text-orange-400',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ),
          border: 'border-orange-200 dark:border-orange-500/30',
          glow: 'shadow-orange-500/10'
        };
      case 'PENDING':
        return {
          bg: 'bg-blue-100 dark:bg-blue-500/20',
          text: 'text-blue-700 dark:text-blue-400',
          icon: (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ),
          border: 'border-blue-200 dark:border-blue-500/30',
          glow: 'shadow-blue-500/10'
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-500/20',
          text: 'text-gray-700 dark:text-gray-400',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          ),
          border: 'border-gray-200 dark:border-gray-500/30',
          glow: 'shadow-gray-500/10'
        };
    }
  };

  const config = getStatusConfig(attempt.status);
  const isLatest = index === 0;

  return (
    <div className={`relative overflow-hidden rounded-xl border ${config.border} ${isLatest ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-purple-500/50' : ''} bg-white dark:bg-gray-800/50 shadow-lg ${config.glow} transition-all hover:shadow-xl`}>
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.bg}`}></div>
      
      <div className="p-4 pl-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Attempt number */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 font-bold text-gray-700 dark:text-gray-300 shadow-inner">
              #{attempt.attempts || (total - index)}
            </div>
            
            {/* Status badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${config.bg} ${config.text} font-semibold text-sm`}>
              {config.icon}
              {attempt.status}
            </div>

            {isLatest && (
              <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-semibold">
                Latest
              </span>
            )}
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {attempt.created_at ? new Date(attempt.created_at).toLocaleString() : attempt.timestamp || 'N/A'}
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Webhook URL */}
          {attempt.webhook_url && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Webhook URL</p>
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded">
                {attempt.webhook_url}
              </p>
            </div>
          )}

          {/* Response Code */}
          {(attempt.response_code || attempt.responseCode) && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Response Code</p>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center justify-center w-14 h-7 rounded-lg font-mono font-bold text-sm ${
                  (attempt.response_code || attempt.responseCode) >= 200 && (attempt.response_code || attempt.responseCode) < 300
                    ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                    : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                }`}>
                  {attempt.response_code || attempt.responseCode}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {(attempt.last_error || attempt.error) && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wider mb-1">Error Message</p>
                <p className="text-sm text-red-600 dark:text-red-400">
                  {attempt.last_error || attempt.error}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryAttempt;
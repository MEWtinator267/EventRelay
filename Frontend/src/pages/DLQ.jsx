import { useEffect, useState } from "react";
import api from "../services/api";
import DLQTable from "../components/DLQTable";

const DLQ = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(null);

  const fetchDLQ = () => {
    setLoading(true);
    api.get("/dlq")
      .then(res => setItems(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDLQ();
  }, []);

  const handleRetry = async (deliveryId) => {
    setRetrying(deliveryId);
    try {
      await api.post(`/dlq/${deliveryId}/retry`);
      fetchDLQ(); // refresh table
    } catch (error) {
      console.error('Retry failed:', error);
      alert('Failed to retry. Please try again.');
    } finally {
      setRetrying(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading DLQ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dead Letter Queue
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Failed events that require attention
          </p>
        </div>
        
        <button 
          onClick={fetchDLQ}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative overflow-hidden bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-5">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-500/20 rounded-xl">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total in DLQ</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{items.length}</p>
            </div>
          </div>
        </div>
        
        <div className="relative overflow-hidden bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-5">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-500/20 rounded-xl">
              <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Retry Attempts</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {items.reduce((sum, item) => sum + (item.attempts || 0), 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="relative overflow-hidden bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-5">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Unique Events</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {new Set(items.map(i => i.event_type)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      {items.length === 0 ? (
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-500/20 dark:to-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">All clear!</h3>
          <p className="text-gray-500 dark:text-gray-400">No failed events in the dead letter queue. Everything is running smoothly.</p>
        </div>
      ) : (
        <DLQTable items={items} onRetry={handleRetry} retrying={retrying} />
      )}
    </div>
  );
};

export default DLQ;
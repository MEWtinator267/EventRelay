import { useEffect, useState } from "react";
import api from "../services/api";
import WebhooksTable from "../components/WebhooksTable";

const Webhooks = () => {
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/webhooks")
      .then((res) => setWebhooks(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading webhooks...</p>
        </div>
      </div>
    );
  }

  const activeCount = webhooks.filter(w => w.status === 'ACTIVE').length;
  const inactiveCount = webhooks.filter(w => w.status === 'INACTIVE').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Webhooks
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage and monitor your webhook endpoints
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative overflow-hidden bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-5">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-xl">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Webhooks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{webhooks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="relative overflow-hidden bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-5">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl">
              <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Active</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{activeCount}</p>
            </div>
          </div>
        </div>
        
        <div className="relative overflow-hidden bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-5">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-500/20 to-slate-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Inactive</p>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{inactiveCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      {webhooks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No webhooks configured</h3>
          <p className="text-gray-500 dark:text-gray-400">Webhooks will appear here once they are configured in the system.</p>
        </div>
      ) : (
        <WebhooksTable webhooks={webhooks} />
      )}
    </div>
  );
};

export default Webhooks;
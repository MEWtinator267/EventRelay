import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardCard from "../components/DashboardCard";
import ThroughputChart from "../components/ThroughputChart";
import DeliveryStatusChart from "../components/DeliveryStatusChart";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [charts, setCharts] = useState(null);

  useEffect(() => {
    api.get("/metrics").then(res => setMetrics(res.data));
    api.get("/metrics/charts").then(res => setCharts(res.data));
  }, []);

  if (!metrics || !charts) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Real-time metrics and event analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard 
          title="Total Events" 
          value={metrics.totalEvents}
          icon="events"
          trend="+12%"
          color="blue"
        />
        <DashboardCard 
          title="Failed Deliveries" 
          value={metrics.failedDeliveries}
          icon="failed"
          trend="-5%"
          color="red"
        />
        <DashboardCard 
          title="Active Webhooks" 
          value={metrics.activeWebhooks}
          icon="webhooks"
          trend="+3"
          color="green"
        />
        <DashboardCard 
          title="DLQ Count" 
          value={metrics.dlqCount}
          icon="dlq"
          trend="0"
          color="yellow"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ThroughputChart data={charts.throughput} />
        <DeliveryStatusChart data={charts.deliveryStatus} />
      </div>
    </div>
  );
};

export default Dashboard;
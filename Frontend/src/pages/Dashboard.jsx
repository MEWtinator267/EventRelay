import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    api.get("/metrics")
      .then((res) => setMetrics(res.data))
      .catch(console.error);
  }, []);

  if (!metrics) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard title="Total Events" value={metrics.totalEvents} />
        <DashboardCard title="Failed Deliveries" value={metrics.failedDeliveries} />
        <DashboardCard title="Active Webhooks" value={metrics.activeWebhooks} />
        <DashboardCard title="DLQ Count" value={metrics.dlqCount} />
      </div>
    </div>
  );
};

export default Dashboard;
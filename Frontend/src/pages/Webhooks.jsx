import { useEffect, useState } from "react";
import api from "../services/api";
import WebhooksTable from "../components/WebhooksTable";

const Webhooks = () => {
  const [webhooks, setWebhooks] = useState([]);

  useEffect(() => {
    api.get("/webhooks")
      .then((res) => setWebhooks(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Webhooks</h1>
      <WebhooksTable webhooks={webhooks} />
    </div>
  );
};

export default Webhooks;
import { useEffect, useState } from "react";
import api from "../services/api";
import DLQTable from "../components/DLQTable";

const DLQ = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/dlq")
      .then((res) => setItems(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dead Letter Queue</h1>
      <DLQTable items={items} />
    </div>
  );
};

export default DLQ;
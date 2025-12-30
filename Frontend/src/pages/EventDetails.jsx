import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import DeliveryAttempt from "../components/DeliveryAttempt";

const EventDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/events/${id}`)
      .then((res) => setData(res.data))
      .catch(console.error);
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Event Details</h1>

      <div className="bg-white p-4 rounded border">
        <p><strong>Type:</strong> {data.event.event_type}</p>
        <p><strong>Created:</strong> {data.event.created_at}</p>
      </div>

      <div className="bg-white p-4 rounded border">
        <h2 className="font-semibold mb-2">Payload</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm">
          {JSON.stringify(data.event.payload, null, 2)}
        </pre>
      </div>

      <div className="bg-white p-4 rounded border space-y-2">
        <h2 className="font-semibold">Delivery Attempts</h2>
        {data.deliveries.map((d, i) => (
          <DeliveryAttempt key={i} attempt={d} />
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const EventsTable = ({ events }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Event ID</th>
            <th className="px-4 py-3 text-left">Event Type</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Attempts</th>
            <th className="px-4 py-3 text-left">Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr
              key={event.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <td className="px-4 py-3 font-medium">{event.id}</td>
              <td className="px-4 py-3">{event.type}</td>
              <td className="px-4 py-3">
                <StatusBadge status={event.status} />
              </td>
              <td className="px-4 py-3">{event.attempts}</td>
              <td className="px-4 py-3 text-gray-500">
                {event.timestamp}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
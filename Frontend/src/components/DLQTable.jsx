const DLQTable = ({ items }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Event ID</th>
            <th className="px-4 py-3 text-left">Event Type</th>
            <th className="px-4 py-3 text-left">Reason</th>
            <th className="px-4 py-3 text-left">Attempts</th>
            <th className="px-4 py-3 text-left">Last Error</th>
            <th className="px-4 py-3 text-left">Timestamp</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3 font-medium">
                {item.eventId}
              </td>
              <td className="px-4 py-3">
                {item.eventType}
              </td>
              <td className="px-4 py-3">
                {item.reason}
              </td>
              <td className="px-4 py-3">
                {item.attempts}
              </td>
              <td className="px-4 py-3 text-red-600">
                {item.lastError}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {item.timestamp}
              </td>
              <td className="px-4 py-3">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => alert("Manual retry triggered")}
                >
                  Retry
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DLQTable;
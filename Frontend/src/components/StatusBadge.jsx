const statusColors = {
  SUCCESS: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  DLQ: "bg-yellow-100 text-yellow-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded ${
        statusColors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
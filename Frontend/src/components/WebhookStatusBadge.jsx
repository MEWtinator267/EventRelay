const statusStyles = {
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-gray-200 text-gray-600",
};

const WebhookStatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        statusStyles[status]
      }`}
    >
      {status}
    </span>
  );
};

export default WebhookStatusBadge;
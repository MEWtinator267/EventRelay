const DeliveryAttempt = ({ attempt }) => {
  return (
    <div className="border rounded p-3 text-sm space-y-1">
      <div className="flex justify-between">
        <span className="font-medium">
          Attempt #{attempt.attempt}
        </span>
        <span className="text-gray-500">
          {attempt.timestamp}
        </span>
      </div>

      <div>Status: {attempt.status}</div>
      <div>Response Code: {attempt.responseCode}</div>
      <div className="text-red-600">
        Error: {attempt.error}
      </div>
    </div>
  );
};

export default DeliveryAttempt;
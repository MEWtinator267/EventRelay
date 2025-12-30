import WebhookStatusBadge from "./WebhookStatusBadge";

const WebhooksTable = ({ webhooks }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Webhook URL</th>
            <th className="px-4 py-3 text-left">Events</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Retry Policy</th>
            <th className="px-4 py-3 text-left">Last Delivery</th>
          </tr>
        </thead>

        <tbody>
          {webhooks.map((wh) => (
            <tr
              key={wh.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3 font-medium">
                {wh.url}
              </td>
              <td className="px-4 py-3">
                {Array.isArray(wh.subscribed_events)
                  ? wh.subscribed_events.join(", ")
                : "—"}
              </td>
              <td className="px-4 py-3">
                <WebhookStatusBadge status={wh.status} />
              </td>
              <td className="px-4 py-3">
                {wh.retryPolicy}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {wh.lastDelivery}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WebhooksTable;
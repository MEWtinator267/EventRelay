const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg border p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-900 mt-2">
        {value}
      </p>
    </div>
  );
};

export default DashboardCard;
const SpecItem = ({ icon, label, value }) => (
  <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
    {icon}
    <div className="ml-3">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default SpecItem;

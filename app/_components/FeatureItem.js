const FeatureItem = ({ feature, value }) => (
    <div
      className={`flex items-center justify-between p-3 ${
        value ? "bg-green-100" : "bg-red-100"
      } rounded-lg`}
    >
      <span className="font-medium text-gray-700">{feature}</span>
      <span className={`text-2xl ${value ? "text-green-500" : "text-red-500"}`}>
        {value ? "✔️" : "❌"}
      </span>
    </div>
  );

  export default FeatureItem;
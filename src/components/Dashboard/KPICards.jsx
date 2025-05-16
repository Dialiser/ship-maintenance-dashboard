import React from "react";

const KPICards = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="backdrop-blur bg-white/70 border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="text-3xl mb-3">{item.icon}</div>
          <h3 className="text-lg font-medium text-gray-700">{item.title}</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-1">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;

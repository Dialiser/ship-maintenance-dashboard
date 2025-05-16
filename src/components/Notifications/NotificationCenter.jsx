// src/components/Notifications/NotificationCenter.jsx
import React, { useState, useEffect } from "react";

const NotificationCenter = ({ notifications }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  const dismiss = (id) => {
    setVisibleNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 w-80 space-y-2 z-50">
      {visibleNotifications.map((n) => (
        <div
          key={n.id}
          className={`p-3 rounded shadow text-white ${
            n.type === "error"
              ? "bg-red-600"
              : n.type === "success"
              ? "bg-green-600"
              : "bg-blue-600"
          }`}
        >
          <div className="flex justify-between items-center">
            <p>{n.message}</p>
            <button onClick={() => dismiss(n.id)} className="ml-4 font-bold">
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;

// src/components/Components/ComponentForm.jsx
import React, { useState, useContext, useEffect } from "react";
import { ComponentsContext } from "../../contexts/ComponentsContext";

const ComponentForm = ({ shipId, existingComponent, onClose }) => {
  const { addComponent, editComponent } = useContext(ComponentsContext);

  const [name, setName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [installDate, setInstallDate] = useState("");
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState("");

  useEffect(() => {
    if (existingComponent) {
      setName(existingComponent.name);
      setSerialNumber(existingComponent.serialNumber);
      setInstallDate(existingComponent.installDate);
      setLastMaintenanceDate(existingComponent.lastMaintenanceDate);
    }
  }, [existingComponent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const componentData = {
      shipId,
      name,
      serialNumber,
      installDate,
      lastMaintenanceDate,
    };

    if (existingComponent) {
      editComponent({ ...existingComponent, ...componentData });
      if (onClose) onClose();
    } else {
      addComponent(componentData);
      // Reset form after adding
      setName("");
      setSerialNumber("");
      setInstallDate("");
      setLastMaintenanceDate("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 border rounded bg-white shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-2">
        {existingComponent ? "Edit Component" : "Add New Component"}
      </h3>
      <div className="mb-2">
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          className="w-full border px-2 py-1 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1 font-medium">Serial Number</label>
        <input
          type="text"
          className="w-full border px-2 py-1 rounded"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1 font-medium">Installation Date</label>
        <input
          type="date"
          className="w-full border px-2 py-1 rounded"
          value={installDate}
          onChange={(e) => setInstallDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1 font-medium">Last Maintenance Date</label>
        <input
          type="date"
          className="w-full border px-2 py-1 rounded"
          value={lastMaintenanceDate}
          onChange={(e) => setLastMaintenanceDate(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {existingComponent ? "Update" : "Add"}
      </button>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-2 px-4 py-2 rounded border hover:bg-gray-100"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default ComponentForm;

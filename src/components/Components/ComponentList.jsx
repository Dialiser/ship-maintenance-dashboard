// src/components/Components/ComponentList.jsx
import React, { useContext, useState } from "react";
import { ComponentsContext } from "../../contexts/ComponentsContext";
import ComponentForm from "./ComponentForm";

const ComponentList = ({ shipId }) => {
  const { components, deleteComponent } = useContext(ComponentsContext);
  const [editingComponent, setEditingComponent] = useState(null);

  const shipComponents = components.filter((c) => c.shipId === shipId);

  return (
    <div>
      {editingComponent ? (
        <ComponentForm
          shipId={shipId}
          existingComponent={editingComponent}
          onClose={() => setEditingComponent(null)}
        />
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">Components</h3>
          {shipComponents.length === 0 ? (
            <p>No components installed for this ship.</p>
          ) : (
            <table className="min-w-full border border-gray-300 mb-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-3 py-1">Name</th>
                  <th className="border px-3 py-1">Serial Number</th>
                  <th className="border px-3 py-1">Install Date</th>
                  <th className="border px-3 py-1">Last Maintenance</th>
                  <th className="border px-3 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shipComponents.map((comp) => (
                  <tr key={comp.id} className="text-center">
                    <td className="border px-3 py-1">{comp.name}</td>
                    <td className="border px-3 py-1">{comp.serialNumber}</td>
                    <td className="border px-3 py-1">{comp.installDate}</td>
                    <td className="border px-3 py-1">
                      {comp.lastMaintenanceDate}
                    </td>
                    <td className="border px-3 py-1 space-x-2">
                      <button
                        className="px-2 py-1 bg-yellow-400 text-white rounded"
                        onClick={() => setEditingComponent(comp)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-600 text-white rounded"
                        onClick={() => deleteComponent(comp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default ComponentList;

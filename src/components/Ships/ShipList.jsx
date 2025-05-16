import React, { useContext } from "react";
import { ShipsContext } from "../../contexts/ShipsContext";
import { useNavigate } from "react-router-dom";

const ShipList = () => {
  const { ships, deleteShip } = useContext(ShipsContext);
  const navigate = useNavigate();

  return (
    <div>
      {/* Button to navigate to add new ship form */}
      <button
        onClick={() => navigate("/ships/new")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add New Ship
      </button>

      {/* Show message if no ships */}
      {ships.length === 0 ? (
        <p>No ships available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">IMO Number</th>
              <th className="border px-4 py-2">Flag</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ships.map((ship) => (
              <tr key={ship.id} className="hover:bg-gray-100 cursor-default">
                {/* Clicking ship name navigates to ship detail */}
                <td
                  className="border px-4 py-2 cursor-pointer text-blue-600 hover:underline"
                  onClick={() => navigate(`/ships/${ship.id}`)}
                >
                  {ship.name}
                </td>
                <td className="border px-4 py-2">{ship.imo}</td>
                <td className="border px-4 py-2">{ship.flag}</td>
                <td className="border px-4 py-2">{ship.status}</td>
                <td className="border px-4 py-2 space-x-2">
                  {/* Edit button navigates to edit ship form */}
                  <button
                    onClick={() => navigate(`/ships/edit/${ship.id}`)}
                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>

                  {/* Delete button calls deleteShip from context */}
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this ship?"
                        )
                      ) {
                        deleteShip(ship.id);
                      }
                    }}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShipList;

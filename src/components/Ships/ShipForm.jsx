import React, { useState, useContext, useEffect } from "react";
import { ShipsContext } from "../../contexts/ShipsContext";
import { useNavigate, useParams } from "react-router-dom";

const ShipForm = () => {
  const { ships, addShip, editShip } = useContext(ShipsContext);
  const navigate = useNavigate();
  const { id } = useParams(); // id is undefined if adding new ship

  // Find ship to edit if id exists
  const editingShip = ships.find((ship) => ship.id === id);

  // Form state
  const [ship, setShip] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "",
  });

  // On mount or id change, prefill form if editing
  useEffect(() => {
    if (editingShip) {
      setShip({
        name: editingShip.name,
        imo: editingShip.imo,
        flag: editingShip.flag,
        status: editingShip.status,
      });
    }
  }, [editingShip]);

  // Handle input changes
  const handleChange = (e) => {
    setShip({ ...ship, [e.target.name]: e.target.value });
  };

  // Handle form submit for add or edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ship.name && ship.imo && ship.flag && ship.status) {
      if (editingShip) {
        editShip({ ...editingShip, ...ship });
      } else {
        addShip(ship);
      }
      navigate("/ships"); // Go back to ships list after submit
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <h3 className="text-xl font-semibold mb-4">
        {editingShip ? "Edit Ship" : "Add New Ship"}
      </h3>

      <input
        name="name"
        placeholder="Ship Name"
        value={ship.name}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
      />
      <input
        name="imo"
        placeholder="IMO Number"
        value={ship.imo}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
      />
      <input
        name="flag"
        placeholder="Flag"
        value={ship.flag}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
      />
      <input
        name="status"
        placeholder="Status"
        value={ship.status}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editingShip ? "Update Ship" : "Add Ship"}
      </button>
    </form>
  );
};

export default ShipForm;

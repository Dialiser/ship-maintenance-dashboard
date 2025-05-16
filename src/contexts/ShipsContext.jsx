import React, { createContext, useState, useEffect } from "react";

export const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState(() => {
    const stored = localStorage.getItem("ships");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (ships.length > 0) {
      localStorage.setItem("ships", JSON.stringify(ships));
    }
  }, [ships]);

  const addShip = (ship) => {
    setShips((prev) => [...prev, { ...ship, id: Date.now().toString() }]);
  };

  const editShip = (updatedShip) => {
    setShips((prev) =>
      prev.map((ship) => (ship.id === updatedShip.id ? updatedShip : ship))
    );
  };

  const deleteShip = (id) => {
    setShips((prev) => prev.filter((ship) => ship.id !== id));
  };

  return (
    <ShipsContext.Provider value={{ ships, addShip, editShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};

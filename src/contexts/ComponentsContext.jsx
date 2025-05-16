import React, { createContext, useState, useEffect } from "react";

export const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState(() => {
    const stored = localStorage.getItem("components");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("components", JSON.stringify(components));
  }, [components]);

  const addComponent = (component) => {
    setComponents([...components, { ...component, id: Date.now().toString() }]);
  };

  const editComponent = (updated) => {
    setComponents(components.map((c) => (c.id === updated.id ? updated : c)));
  };

  const deleteComponent = (id) => {
    setComponents(components.filter((c) => c.id !== id));
  };

  return (
    <ComponentsContext.Provider
      value={{ components, addComponent, editComponent, deleteComponent }}
    >
      {children}
    </ComponentsContext.Provider>
  );
};

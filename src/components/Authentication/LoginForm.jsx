import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "../../styles/main.css";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const seedMockData = () => {
    if (!localStorage.getItem("ships")) {
      localStorage.setItem(
        "ships",
        JSON.stringify([
          {
            id: "s1",
            name: "Ever Given",
            imo: "9811000",
            flag: "Panama",
            status: "Active",
          },
        ])
      );
    }

    if (!localStorage.getItem("components")) {
      localStorage.setItem(
        "components",
        JSON.stringify([
          {
            id: "c1",
            shipId: "s1",
            name: "Main Engine",
            serialNumber: "ME-1234",
            installDate: "2020-01-10",
            lastMaintenanceDate: "2023-10-01", // Overdue
          },
        ])
      );
    }

    if (!localStorage.getItem("jobs")) {
      localStorage.setItem(
        "jobs",
        JSON.stringify([
          {
            id: "j1",
            componentId: "c1",
            shipId: "s1",
            type: "Inspection",
            priority: "High",
            status: "Open",
            assignedEngineerId: "3",
            scheduledDate: "2025-05-05",
          },
          {
            id: "j2",
            componentId: "c1",
            shipId: "s1",
            type: "Repair",
            priority: "Low",
            status: "Completed",
            assignedEngineerId: "3",
            scheduledDate: "2025-04-01",
          },
        ])
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      seedMockData(); // Seed once at login
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

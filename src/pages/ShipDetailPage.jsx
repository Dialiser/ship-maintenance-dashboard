import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShipsContext } from "../contexts/ShipsContext";
import { ComponentsContext } from "../contexts/ComponentsContext";
import { JobsContext } from "../contexts/JobsContext";
import ComponentForm from "../components/Components/ComponentForm";
import ComponentList from "../components/Components/ComponentList";

const ShipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { ships } = useContext(ShipsContext);
  const { components } = useContext(ComponentsContext);
  const { jobs } = useContext(JobsContext);

  const ship = ships.find((s) => s.id === id);
  const shipComponents = components.filter((c) => c.shipId === id);
  const shipJobs = jobs.filter((j) => j.shipId === id);

  if (!ship) return <p>Ship not found.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate("/ships")}
        className="mb-4 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
      >
        &larr; Back to Ship List
      </button>

      <h1 className="text-3xl font-bold mb-4">{ship.name} - Details</h1>

      <section className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">General Information</h2>
        <p>
          <strong>IMO:</strong> {ship.imo}
        </p>
        <p>
          <strong>Flag:</strong> {ship.flag}
        </p>
        <p>
          <strong>Status:</strong> {ship.status}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Component</h2>
        <ComponentForm shipId={id} />
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Components Installed</h2>
        <ComponentList shipId={id} />
        {shipComponents.length === 0 && (
          <p className="text-gray-600 mt-2">No components installed.</p>
        )}
      </section>

      <section className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Maintenance Jobs</h2>
        {shipJobs.length === 0 ? (
          <p className="text-gray-600">No jobs scheduled.</p>
        ) : (
          <ul className="list-disc list-inside">
            {shipJobs.map((job) => (
              <li key={job.id}>
                {job.type} - {job.status} (Priority: {job.priority}) on{" "}
                {job.scheduledDate}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ShipDetailPage;

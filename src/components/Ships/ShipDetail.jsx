import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShipsContext } from "../../contexts/ShipsContext";
import { ComponentsContext } from "../../contexts/ComponentsContext";
import { JobsContext } from "../../contexts/JobsContext";

const ShipDetail = () => {
  const { id } = useParams(); // ship id from URL
  const navigate = useNavigate();

  const { ships } = useContext(ShipsContext);
  const { components } = useContext(ComponentsContext);
  const { jobs } = useContext(JobsContext);

  const ship = ships.find((s) => s.id === id);

  if (!ship) {
    return <p>Ship not found.</p>;
  }

  // Components installed on this ship
  const shipComponents = components.filter((comp) => comp.shipId === ship.id);

  // Jobs related to this ship
  const shipJobs = jobs.filter((job) => job.shipId === ship.id);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-300 rounded"
      >
        &larr; Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{ship.name} Details</h1>

      <section className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">General Information</h2>
        <p>
          <strong>IMO Number:</strong> {ship.imo}
        </p>
        <p>
          <strong>Flag:</strong> {ship.flag}
        </p>
        <p>
          <strong>Status:</strong> {ship.status}
        </p>
      </section>

      <section className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Components Installed</h2>
        {shipComponents.length === 0 ? (
          <p>No components installed.</p>
        ) : (
          <ul className="list-disc list-inside">
            {shipComponents.map((comp) => (
              <li key={comp.id}>
                {comp.name} (Serial: {comp.serialNumber}) - Last Maintenance:{" "}
                {comp.lastMaintenanceDate}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Maintenance Jobs</h2>
        {shipJobs.length === 0 ? (
          <p>No maintenance jobs scheduled.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-3 py-1">Job Type</th>
                <th className="border px-3 py-1">Priority</th>
                <th className="border px-3 py-1">Status</th>
                <th className="border px-3 py-1">Scheduled Date</th>
              </tr>
            </thead>
            <tbody>
              {shipJobs.map((job) => (
                <tr key={job.id} className="text-center">
                  <td className="border px-3 py-1">{job.type}</td>
                  <td className="border px-3 py-1">{job.priority}</td>
                  <td className="border px-3 py-1">{job.status}</td>
                  <td className="border px-3 py-1">{job.scheduledDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default ShipDetail;

// src/components/Jobs/JobList.jsx
import React, { useContext, useState } from "react";
import { JobsContext } from "../../contexts/JobsContext";
import { ShipsContext } from "../../contexts/ShipsContext";

const JobList = () => {
  const { jobs, editJob, deleteJob } = useContext(JobsContext);
  const { ships } = useContext(ShipsContext);

  // Filters state
  const [filterShipId, setFilterShipId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  // Filtered jobs based on filters
  const filteredJobs = jobs.filter((job) => {
    return (
      (filterShipId ? job.shipId === filterShipId : true) &&
      (filterStatus ? job.status === filterStatus : true) &&
      (filterPriority ? job.priority === filterPriority : true)
    );
  });

  const handleStatusChange = (jobId, newStatus) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      editJob({ ...job, status: newStatus });
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Maintenance Jobs</h2>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4">
        <select
          value={filterShipId}
          onChange={(e) => setFilterShipId(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Ships</option>
          {ships.map((ship) => (
            <option key={ship.id} value={ship.id}>
              {ship.name}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Job List Table */}
      {filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-3 py-1">Ship</th>
              <th className="border px-3 py-1">Type</th>
              <th className="border px-3 py-1">Priority</th>
              <th className="border px-3 py-1">Status</th>
              <th className="border px-3 py-1">Scheduled Date</th>
              <th className="border px-3 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => {
              const ship = ships.find((s) => s.id === job.shipId);
              return (
                <tr key={job.id} className="text-center">
                  <td className="border px-3 py-1">
                    {ship ? ship.name : "Unknown"}
                  </td>
                  <td className="border px-3 py-1">{job.type}</td>
                  <td className="border px-3 py-1">{job.priority}</td>
                  <td className="border px-3 py-1">{job.status}</td>
                  <td className="border px-3 py-1">{job.scheduledDate}</td>
                  <td className="border px-3 py-1 space-x-2">
                    <select
                      value={job.status}
                      onChange={(e) =>
                        handleStatusChange(job.id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded"
                      onClick={() => deleteJob(job.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobList;

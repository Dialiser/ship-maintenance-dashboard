// src/components/Jobs/JobForm.jsx
import React, { useState, useContext, useEffect } from "react";
import { JobsContext } from "../../contexts/JobsContext";
import { ShipsContext } from "../../contexts/ShipsContext";
import { ComponentsContext } from "../../contexts/ComponentsContext";

const JobForm = ({ existingJob, onClose }) => {
  const { addJob, editJob } = useContext(JobsContext);
  const { ships } = useContext(ShipsContext);
  const { components } = useContext(ComponentsContext);

  const [shipId, setShipId] = useState("");
  const [componentId, setComponentId] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");
  const [assignedEngineerId, setAssignedEngineerId] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");

  useEffect(() => {
    if (existingJob) {
      setShipId(existingJob.shipId);
      setComponentId(existingJob.componentId);
      setType(existingJob.type);
      setPriority(existingJob.priority);
      setStatus(existingJob.status);
      setAssignedEngineerId(existingJob.assignedEngineerId);
      setScheduledDate(existingJob.scheduledDate);
    }
  }, [existingJob]);

  // Filter components based on selected ship
  const filteredComponents = components.filter((c) => c.shipId === shipId);

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      shipId,
      componentId,
      type,
      priority,
      status,
      assignedEngineerId,
      scheduledDate,
    };

    if (existingJob) {
      editJob({ ...existingJob, ...jobData });
      if (onClose) onClose();
    } else {
      addJob(jobData);
      // Reset form
      setShipId("");
      setComponentId("");
      setType("");
      setPriority("Low");
      setStatus("Open");
      setAssignedEngineerId("");
      setScheduledDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-4">
        {existingJob ? "Edit Job" : "Create New Job"}
      </h3>

      <div className="mb-2">
        <label className="block mb-1 font-medium">Ship</label>
        <select
          value={shipId}
          onChange={(e) => setShipId(e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Select Ship</option>
          {ships.map((ship) => (
            <option key={ship.id} value={ship.id}>
              {ship.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-medium">Component</label>
        <select
          value={componentId}
          onChange={(e) => setComponentId(e.target.value)}
          required
          disabled={!shipId}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Select Component</option>
          {filteredComponents.map((comp) => (
            <option key={comp.id} value={comp.id}>
              {comp.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-medium">Job Type</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
          placeholder="e.g. Inspection, Repair"
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-medium">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-medium">Assigned Engineer ID</label>
        <input
          type="text"
          value={assignedEngineerId}
          onChange={(e) => setAssignedEngineerId(e.target.value)}
          placeholder="Engineer ID"
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-medium">Scheduled Date</label>
        <input
          type="date"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {existingJob ? "Update Job" : "Create Job"}
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

export default JobForm;

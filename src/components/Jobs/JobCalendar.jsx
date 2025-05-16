// src/components/Jobs/JobCalendar.jsx
import React, { useState, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { JobsContext } from "../../contexts/JobsContext";

const JobCalendar = () => {
  const { jobs } = useContext(JobsContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filter jobs for selected date (date string compare)
  const selectedDateStr = selectedDate.toISOString().split("T")[0];
  const jobsForDate = jobs.filter(
    (job) => job.scheduledDate === selectedDateStr
  );

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Maintenance Calendar</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <h3 className="mt-4 mb-2">Jobs scheduled for {selectedDateStr}</h3>
      {jobsForDate.length === 0 ? (
        <p>No jobs scheduled on this day.</p>
      ) : (
        <ul className="list-disc list-inside">
          {jobsForDate.map((job) => (
            <li key={job.id}>
              {job.type} - Priority: {job.priority} - Status: {job.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobCalendar;

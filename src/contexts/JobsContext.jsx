import React, { createContext, useState, useEffect } from "react";

export const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const stored = localStorage.getItem("jobs");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs([...jobs, { ...job, id: Date.now().toString() }]);
  };

  const editJob = (updated) => {
    setJobs(jobs.map((j) => (j.id === updated.id ? updated : j)));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, editJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
};

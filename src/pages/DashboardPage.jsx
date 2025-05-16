import React, { useContext, useEffect, useState } from "react";
import { ShipsContext } from "../contexts/ShipsContext";
import { ComponentsContext } from "../contexts/ComponentsContext";
import { JobsContext } from "../contexts/JobsContext";
import KPICards from "../components/Dashboard/KPICards";
import Charts from "../components/Dashboard/Charts";

const DashboardPage = () => {
  const { ships } = useContext(ShipsContext);
  const { components } = useContext(ComponentsContext);
  const { jobs } = useContext(JobsContext);

  const [overdueComponents, setOverdueComponents] = useState([]);

  useEffect(() => {
    const today = new Date();
    const overdue = (components || []).filter((comp) => {
      const lastDate = new Date(comp.lastMaintenanceDate);
      const diffDays = (today - lastDate) / (1000 * 60 * 60 * 24);
      return diffDays > 180;
    });
    setOverdueComponents(overdue);
  }, [components]);

  const jobsInProgress = jobs.filter(
    (job) => job.status === "Open" || job.status === "In Progress"
  );
  const jobsCompleted = jobs.filter((job) => job.status === "Completed");

  const kpis = [
    { title: "Total Ships", value: ships.length, icon: "🚢" },
    {
      title: "Overdue Components",
      value: overdueComponents.length,
      icon: "⚙️",
    },
    { title: "Jobs in Progress", value: jobsInProgress.length, icon: "🔧" },
    { title: "Jobs Completed", value: jobsCompleted.length, icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6 md:p-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-2">
          🛠️ Ship Maintenance Dashboard
        </h1>
        <p className="text-gray-500">
          Monitor ships, components, and maintenance jobs
        </p>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        <KPICards data={kpis} />
        <Charts kpiData={kpis} />
      </main>
    </div>
  );
};

export default DashboardPage;

import React from "react";

import { seo } from "../utils/Seo";

import DashboardView from "../components/Dashboard";

const Dashboard = () => {
  seo({
    title: "Dashboard",
  });
  return <DashboardView />;
};

export default Dashboard;

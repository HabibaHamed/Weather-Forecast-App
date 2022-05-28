import React from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const params = useParams();
  console.log(params.city);
  return <div>DASHBOARD</div>;
};

export default Dashboard;

import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-screen h-screen max-h-screen overflow-y-auto">
      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
      </div>
      <Dashboard />
    </div>
  );
};

export default Home;

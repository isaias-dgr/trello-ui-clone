import React from "react";
import Dashboard from "./Dashboard";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Filters from "../../components/Filters/Filters";
import MenuItem from "../../components/Menu/MenuItem";
import {
  CalendarFold,
  ChartPie,
  CirclePlus,
  LayoutDashboard,
  LayoutList,
  View,
} from "lucide-react";
import Button from "../../components/Buttons/Buttons";
import { Routes, Route, Link } from "react-router-dom";
import Overview from "./Overview";
import Chart from "./Chart";
import Calendar from "./Calendar";
import List from "./List";

const Projects: React.FC = () => {
  const actionButton = (
    <Button text="New project" icon={<CirclePlus size={14} />} />
  );

  return (
    <div className="flex-1 ml-48 bg-stone-50 pt-2 px-6 overflow-y-auto">
      <Header />
      <Menu button={actionButton}>
        <Link to="overview" className="h-full">
          <MenuItem
            icon={<View size={14} />}
            title="Overview"
            value="overview"
          />
        </Link>
        <Link to="dashboard" className="h-full">
          <MenuItem
            icon={<LayoutDashboard size={14} />}
            title="Dashboard"
            value="dashboard"
          />
        </Link>
        <Link to="list" className="h-full">
          <MenuItem icon={<LayoutList size={14} />} title="List" value="list" />
        </Link>
        <Link to="chart" className="h-full">
          <MenuItem icon={<ChartPie size={14} />} title="Chart" value="chart" />
        </Link>
        <Link to="calendar" className="h-full">
          <MenuItem
            icon={<CalendarFold size={14} />}
            title="Calendar"
            value="calendar"
          />
        </Link>
      </Menu>
      <Filters />
      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="list" element={<List />} />
        <Route path="chart" element={<Chart />} />
        <Route path="calendar" element={<Calendar />} />
      </Routes>
    </div>
  );
};

export default Projects;

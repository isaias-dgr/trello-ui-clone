import React from 'react';
import Sidebar from "./components/SideBar/SideBar";
import SidebarItem from "./components/SideBar/SideBarItem";
import Home from "./pages/Home";
import { LayoutDashboard, ListTodo, Settings } from "lucide-react";

const App: React.FC = () => {
  return (
    <main className="App flex flex-grow overflow-hidden bg-slate-100">
      <Sidebar>
        <SidebarItem icon={<ListTodo size={20} />} text="ToDo List" alert />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Board" active />
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Config" />
      </Sidebar>
      <Home />
    </main>
  );
};

export default App;

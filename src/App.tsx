import React from 'react';
import Sidebar from "./components/SideBar/SideBar";
import SidebarItem from "./components/SideBar/SideBarItem";
import Projects from "./pages/Projects/Projects";
import {
  FolderKanban,
  Rocket,
  Bell,
  BriefcaseBusiness,
  Goal,
  Squircle,
} from "lucide-react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import MySite from "./pages/MySite/MySite";
import Portfolio from "./pages/Portfolio/Portfolio";
import Goals from "./pages/Goals/Goals";
import Notification from "./pages/Notification/Notification";
import { Link } from "react-router-dom";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Projects /> },
    { path: "/projects/*", element: <Projects /> },
    { path: "/my-space", element: <MySite /> },
    { path: "/notifications", element: <Notification /> },
    { path: "/portfolio", element: <Portfolio /> },
    { path: "/goals", element: <Goals /> },
  ]);

  return routes;
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Sidebar>
          <Link to="/projects">
            <SidebarItem
              icon={<FolderKanban size={30} />}
              text="Projects"
              value="projects"
            />
          </Link>
          <Link to="/my-space">
            <SidebarItem
              icon={<Rocket size={30} />}
              text="My space"
              value="my-space"
            />
          </Link>
          <Link to="/notifications">
            <SidebarItem
              icon={<Bell size={30} />}
              text="Notifcations"
              value="notifications"
            />
          </Link>

          <hr className="" />
          <Link to="/portfolio">
            <SidebarItem
              icon={<BriefcaseBusiness size={30} />}
              text="Portfolio"
              value="portfolio"
            />
          </Link>
          <Link to="/goals">
            <SidebarItem icon={<Goal size={30} />} text="Goals" value="goals" />
          </Link>
          <hr className="" />
          <SidebarItem
            icon={<Squircle size={14} fill="#ebcb8b" color="#d08770" />}
            text="Projects 1"
            value="project-1"
          />
          <SidebarItem
            icon={<Squircle size={14} fill="#ebcb8b" color="#d08770" />}
            text="Projects 2"
            value="project-2"
          />
        </Sidebar>
        <AppRoutes />
      </Router>
    </ApolloProvider>
  );
};

export default App;

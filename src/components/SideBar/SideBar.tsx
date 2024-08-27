import React, { createContext, ReactNode, useState } from "react";
import { EllipsisVertical } from "lucide-react";

interface SidebarProps {
  children: ReactNode;
}

interface SidebarContextType {
  active: string;
  expanded: boolean;
  changeActive: (newValue: string) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [active, setActive] = useState("projects");

  const changeActive = (newValue: string) => {
    setActive(newValue);
  };

  return (
    <aside className="flex w-48 h-full max-w-48 flex-col items-center border-r-2 border-r-stone-100 bg-stone-50 text-stone-500 fixed">
      <div id="logo" className="justify-cente my-2 flex h-16 items-center">
        <img src="https://img.logoipsum.com/288.svg" alt="" className="w-36" />
      </div>

      <nav id="navbar" className="mt-4 w-full flex-1 flex-col">
        <SidebarContext.Provider
          value={{ active, expanded: false, changeActive }}
        >
          <ul className="mb-4 mt-2 w-full flex-1">{children}</ul>
        </SidebarContext.Provider>
      </nav>

      <div
        id="info"
        className="flex items-center justify-between bg-stone-50 py-3 pl-3"
      >
        <img
          src="https://avatar.iran.liara.run/public/job/operator/male"
          alt=""
          className="h-10 w-10 rounded-full border-2 border-stone-400"
        />
        <div id="info_user" className="flex flex-col pl-3">
          <span
            id="info_user_name"
            className="w-full flex-1 text-sm font-semibold"
          >
            Isaias Garcia
          </span>
          <span id="info_user_role" className="w-full flex-1  text-xs">
            Python Dev
          </span>
        </div>
        <span className="pl-2">
          <EllipsisVertical />
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;

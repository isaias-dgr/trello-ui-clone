import React, { ReactNode, useContext } from "react";
import { SidebarContext } from "./SideBar";

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  value: string;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  value,
  alert,
}) => {
  const css_general = `m-2 flex rounded-lg py-2 items-center justify-between font-semibold `;
  const css_hover = `hover:bg-blue-300 `;
  const css_active = `bg-stone-300 `;

  const sidebarContext = useContext(SidebarContext);
  if (!sidebarContext) {
    throw new Error("ThemeSwitcher must be used within a ThemeProvider");
  }
  const ctx = sidebarContext;

  return (
    <li
      className="mb-4 mt-2 w-full flex-1"
      onClick={() => ctx.changeActive(value)}
    >
      <div
        className={
          css_general + css_hover + (ctx.active === value ? css_active : "")
        }
      >
        <span className="px-2 font-bold">{icon}</span>
        <span className="flex-1 pl-2">{text}</span>
      </div>
    </li>
  );
};

export default SidebarItem;

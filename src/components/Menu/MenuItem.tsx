import React, { useContext } from "react";
import { MenuContext } from "./Menu";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, value }) => {
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    throw new Error("ThemeSwitcher must be used within a ThemeProvider");
  }
  const ctx = menuContext;

  const css_general = `flex h-full h-full px-4 items-center justify-between font-semibold`;
  const css_hover = `hover:bg-blue-300 `;
  const css_active = ctx.active === value ? `bg-stone-300 ` : "";

  return (
    <li
      className={`${css_general} ${css_hover} ${css_active}`}
      onClick={() => ctx.changeActive(value)}
    >
      {icon}
      <span className="pl-2">{title}</span>
    </li>
  );
};

export default MenuItem;

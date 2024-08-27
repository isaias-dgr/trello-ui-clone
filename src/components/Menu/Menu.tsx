import React, { createContext, useState } from "react";

interface MenuProps {
  children: React.ReactNode;
  button: React.ReactNode;
}

interface MenuContextType {
  active: string;
  expanded: boolean;
  changeActive: (newValue: string) => void;
}

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

const Menu: React.FC<MenuProps> = ({ children, button }) => {
  const [active, setActive] = useState("overview");

  const changeActive = (newValue: string) => {
    setActive(newValue);
  };

  return (
    <div
      id="tabs"
      className="rounded-stone-400 mt-7 flex h-12 w-full rounded-lg border-2 bg-stone-100 text-stone-500"
    >
      <MenuContext.Provider value={{ active, expanded: false, changeActive }}>
        <ul className="flex flex-1 items-center ">{children}</ul>
      </MenuContext.Provider>

      {button}
    </div>
  );
};

export default Menu;

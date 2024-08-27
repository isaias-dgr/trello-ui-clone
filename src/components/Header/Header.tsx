import { Share2, SquareAsterisk, SquareChevronDown, Star } from "lucide-react";
import React from "react";

interface HeaderProps {
  // Define the props for the Header component here
}

const Header: React.FC<HeaderProps> = () => {
  // Implement the logic for the Header component here

  return (
    <header className="mb-2 h-16 w-full">
      <div className="flex items-center justify-start p-1">
        <img
          src="https://avatar.iran.liara.run/public/19"
          alt=""
          className="w-14 rounded-full border-2 border-stone-400"
        />
        <div className="flex-1 pl-4">
          <div className="flex items-center">
            <h1 className="text-3xl font-normal">Dashboard</h1>
            <span className="pl-1">
              <SquareChevronDown size={16} />
            </span>
            <span className="pl-2">
              <Star size={26} fill="#ebcb8b" color="#BCA26F" />{" "}
            </span>
          </div>
          <h2 className="flex items-center text-sm font-semibold">
            <SquareAsterisk size={16} fill="#a3be8c" color="#829870" />
            <span className="pl-1">on track</span>
          </h2>
        </div>
        <button className="flex w-100 mr-5 rounded-lg border-2 px-3 py-1 text-stone-400 hover:bg-stone-200 hover:text-stone-500 items-center">
          <Share2 size={16} />
          <span className="pl-1">Shared</span>
        </button>
        <div className="rounded-full">
          <img
            src="https://avatar.iran.liara.run/public/60"
            alt=""
            className="w-14 rounded-full border-2 border-stone-400"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

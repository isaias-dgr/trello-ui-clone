import { ArrowDownUp, CalendarCheck, SlidersHorizontal } from "lucide-react";
import React from "react";

interface FiltersProps {}

const Filters: React.FC<FiltersProps> = ({}) => {
  return (
    <div
      id="filters"
      className="rounded-stone-400 my-2 flex h-12 w-full rounded-lg border-2 bg-stone-50 text-stone-500"
    >
      <span className="flex h-full items-center pl-4">
        <CalendarCheck size={14} />
        <span className="pl-1">Current Sprint</span>
      </span>
      <div className="flex h-full flex-1 items-center justify-end -space-x-3 px-3">
        <img
          src="https://avatar.iran.liara.run/public/19"
          alt=""
          className="h-8 w-8 rounded-full border-2 border-stone-400 hover:z-10"
        />
        <img
          src="https://avatar.iran.liara.run/public/20"
          alt=""
          className="h-8 w-8 rounded-full border-2 border-stone-400 hover:z-10"
        />
        <img
          src="https://avatar.iran.liara.run/public/21"
          alt=""
          className="h-8 w-8 rounded-full border-2 border-stone-400 hover:z-10"
        />
        <img
          src="https://avatar.iran.liara.run/public/23"
          alt=""
          className="h-8 w-8 rounded-full border-2 border-stone-400 hover:z-10"
        />
        <img
          src="https://avatar.iran.liara.run/public/24"
          alt=""
          className="h-8 w-8 rounded-full border-2 border-stone-400 hover:z-10"
        />
        <img
          src="https://avatar.iran.liara.run/public/25"
          alt=""
          className="h-8 w-8 rounded-full border-2 border-stone-400 hover:z-10"
        />
        <img
          src="https://avatar.iran.liara.run/public/26"
          alt=""
          className="h-8 w-8 rounded-full border-2 border-stone-400 hover:z-10"
        />
        <img
          src="https://avatar.iran.liara.run/public/27"
          alt=""
          className="h-8 w-8 rounded-full border-2 border-stone-400 hover:z-10"
        />
      </div>
      <ul className="flex h-full items-center">
        <li className="flex h-full w-16 items-center justify-center hover:bg-stone-200">
          <SlidersHorizontal size={14} />
          <span className="pl-1">Filter</span>
        </li>
        <li className="flex h-full w-16 items-center justify-center hover:bg-stone-200">
          <ArrowDownUp size={14} />
          <span className="pl-1">Sort</span>
        </li>
      </ul>
    </div>
  );
};

export default Filters;

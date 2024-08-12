import React from "react";
import { useSortable } from "@dnd-kit/sortable";

interface ColumnProps {
  id: string;
  title: string;
  totalTasks: number;
  children?: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ id, title, totalTasks, children }) => {
  return (
    <div className="flex flex-col w-80 bg-slate-200 p-3 rounded-t-md">
      <div className="flex items-center h-10 px-2">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded">
          {totalTasks}
        </span>
        <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          ></svg>
        </button>
      </div>

      <div className="flex flex-col pb-2 bg-slate-200 h-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Column;

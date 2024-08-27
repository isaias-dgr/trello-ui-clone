import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CirclePlus } from "lucide-react";

interface ColumnProps {
  id: string;
  title: string;
  totalTasks: number;
  children?: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ id, title, totalTasks, children }) => {
  return (
    <div className="flex-1 m-2 rounded-xl">
      <div className="flex flex-1 text-stone-500 text-xl font-semibold justify-between py-2 pr-4 pl-1">
        <h1>{title}</h1>
        <span className="">{totalTasks}</span>
        <CirclePlus />
      </div>

      <div className="flex flex-col mx-2 bg-stone-50 rounded-lg mb-2">
        {children}
        <div
          id="card_1"
          className="flex flex-col mx-2 py-3 items-center bg-stone-100 rounded-lg shadow-sm border-2 border-dashed border-stone-200 mb-2"
        >
          <div
            id="card_header_1"
            className="flex flex-1 w-full items-center justify-center text-stone-500 font-extrabold"
          >
            <CirclePlus size={30} />
            <span className="ml-3 text-xl">Add Task</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Column;

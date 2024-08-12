import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  BetweenHorizontalStart,
  Blocks,
  Calendar,
  MessageSquareMore,
  Paperclip,
} from "lucide-react";
import clsx from "clsx";

interface UserProps {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  team: string;
}

interface CardsProps {
  id: string;
  title: string;
  description?: string;
  team?: string;
  date?: string;
  comments?: number;
  attachs?: number;
  user?: UserProps;
  children?: React.ReactNode;
}

const Cards: React.FC<CardsProps> = ({
  id,
  title,
  description,
  team,
  date,
  comments,
  attachs,
  user,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className={clsx(
        "relative flex flex-col items-start p-4 mt-4 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer",
        isDragging && "opacity-10"
      )}
    >
      {title === "" ? (
        <>
          <div className="flex flex-col text-lg font-semibold justify-between text-cente">
            <span className="w-full text-sm font-semibold p-2 text-center">
              Drop here to add a new card
            </span>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold">{title}</h3>
          <h4 className="mt-3 text-sm font-medium">{description}</h4>
          <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
            <div className="flex items-center">
              <Calendar size={15} />
              <span className="ml-1 leading-none">{date}</span>
            </div>
            <div className="relative flex items-center ml-4">
              <MessageSquareMore size={15} />
              <span className="ml-1 leading-none">{comments}</span>
            </div>
            <div className="flex items-center ml-4">
              <Paperclip size={15} />
              <span className="ml-1 leading-none">{attachs}</span>
            </div>
            <div className="flex items-center ml-4">
              <Blocks size={15} />
              <span className="ml-1 leading-none">{id}</span>
            </div>
            <img
              className="w-6 h-6 ml-auto rounded-full"
              src={`https://avatar.iran.liara.run/public/?username=${user?.firstName}`}
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;

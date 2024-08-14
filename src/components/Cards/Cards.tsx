import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Blocks, Calendar, MessageSquareMore, Paperclip } from "lucide-react";
import clsx from "clsx";
import { daysToWeeks, formatDistance, subDays } from "date-fns";

interface UserProps {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface CardsProps {
  id: string;
  position?: number;
  status?: string;
  depto?: string;
  title: string;
  description?: string;
  comments?: string[];
  attachments?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserProps;
  children?: React.ReactNode;
}

const Cards: React.FC<CardsProps> = ({
  id,
  position,
  status,
  depto,
  title,
  description,
  comments,
  attachments,
  createdAt,
  updatedAt,
  user,
  children,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id ?? "",
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (!title) {
    return (
      <div
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        className="relative flex flex-col items-start p-4 mt-4 bg-slate-50 hover:bg-slate-100 rounded-lg opacity-50"
      >
        <div className="flex flex-col text-lg font-semibold justify-between items-center mx-auto">
          <span className="w-full text-sm font-semibold p-2 text-center">
            Drop here to add a new card
          </span>
        </div>
      </div>
    );
  }

  const now = new Date();
  let dateDistance: string = "";
  if (createdAt !== undefined) {
    dateDistance = formatDistance(createdAt, now, { addSuffix: true });
  }

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
      <h3 className="text-lg font-semibold">{title}</h3>
      <h4 className="mt-3 text-sm font-medium">{description}</h4>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <Calendar size={15} />
          <span className="ml-1 leading-none">{dateDistance}</span>
        </div>
        <div className="relative flex items-center ml-4">
          <MessageSquareMore size={15} />
          <span className="ml-1 leading-none">{comments?.length}</span>
        </div>
        <div className="flex items-center ml-4">
          <Paperclip size={15} />
          <span className="ml-1 leading-none">{attachments?.length}</span>
        </div>
        <div className="flex items-center ml-4">
          <Blocks size={15} />
          <span className="ml-1 leading-none">{id.slice(-5)}</span>
        </div>
        <img
          className="w-6 h-6 ml-auto rounded-full"
          src={`https://avatar.iran.liara.run/public/?username=${user?.firstName}`}
          alt=""
        />
      </div>
    </div>
  );
};

export default Cards;

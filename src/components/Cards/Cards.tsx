import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Blocks,
  Calendar,
  Dumbbell,
  MessageSquareMore,
  MessageSquareText,
  Paperclip,
  Weight,
} from "lucide-react";
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
      <div {...attributes} {...listeners} ref={setNodeRef} className="">
        <div className="">
          <span className="">Drop here to add a new card</span>
        </div>
      </div>
    );
  }

  const now = new Date();
  let dateDistance: string = "";
  if (createdAt !== undefined) {
    dateDistance = formatDistance(createdAt, now, { addSuffix: true });
  }
  // isDragging && " opacity-10"
  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="flex flex-col mx-2 bg-stone-50 rounded-lg shadow-sm border-2 border-stone-200 mb-2"
    >
      <div id="card_header_1" className="flex-1 w-full px-2">
        <h1 className="font-semibold text-xl text-stone-700 pt-2 ">
          <span className="text-stone-500">{id.slice(-5)}:</span> {title}
        </h1>
        <div id="card_header_1" className="flex  w-full justify-end">
          <span className="ml-2 rounded-lg border-2 border-red-500 bg-red-400 text-stone-50 py-1 px-2 text-xs font-semibold">
            high
          </span>
          <span className="ml-2 rounded-lg border-2 border-green-500 bg-green-400 text-stone-50 py-1 px-2 text-xs font-semibold capitalize ">
            {depto}
          </span>
        </div>
      </div>

      <div
        id="card_description_1"
        className="flex flex-1 w-full line-clamp-2 text-sm py-2 text-ellipsis overflow-hidden text-left  px-4 text-stone-500"
      >
        {description}
      </div>

      <div
        id="card_footer_1"
        className="flex items-center justify-between flex-1 w-full py-2 px-2 font-semibold text-stone-400"
      >
        <div className="flex items-center">
          <Calendar size={16} />
          <span className="ml-1 text-xs">{dateDistance}</span>
        </div>
        <div className="flex items-center">
          <Weight size={16} />
          <span className="ml-1  text-xs ">0</span>
        </div>

        <div className="flex items-center ">
          <MessageSquareText size={16} />
          <span className="ml-1  text-xs ">{comments?.length}</span>
        </div>

        <div className="flex items-center">
          <Paperclip size={16} />
          <span className="ml-1 text-xs ">{attachments?.length}</span>
        </div>

        <div className="flex h-full items-center justify-end -space-x-2">
          <img
            src="https://avatar.iran.liara.run/public/19"
            alt=""
            className="h-5 w-5 rounded-full border-2 border-stone-400 hover:z-10"
          />
          <img
            src="https://avatar.iran.liara.run/public/20"
            alt=""
            className="h-5 w-5 rounded-full border-2 border-stone-400 hover:z-10"
          />
          <img
            src="https://avatar.iran.liara.run/public/21"
            alt=""
            className="h-5 w-5 rounded-full border-2 border-stone-400 hover:z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;

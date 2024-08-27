import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "../../components/Column/Column";
import Cards from "../../components/Cards/Cards";

const GET_ALL_TASKS = gql`
  query {
    allTasks {
      id
      position
      status
      depto
      title
      description
      comments
      attachments
      createdAt
      updatedAt
    }
  }
`;

const MOVE_TASK = gql`
  mutation moveTask(
    $id: UUID!
    $status: String!
    $prevTo: UUID = null
    $nextTo: UUID = null
  ) {
    moveTask(
      input: { id: $id, status: $status, prevTo: $prevTo, nextTo: $nextTo }
    ) {
      task {
        id
        status
        position
      }
    }
  }
`;

interface MoveTaskData {
  moveTask: {
    task: {
      id: string;
      status: string;
      position: number;
    };
  };
}

interface MoveTaskVars {
  id: string;
  status: string;
  prevTo: string | null;
  nextTo: string | null;
}

interface Task {
  id: string;
  position: number;
  status: string;
  depto: string;
  title: string;
  description: string;
  comments: string[];
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface iColumn {
  id: string;
  label: string;
  tasks: Task[];
}

interface Board {
  [key: string]: iColumn;
  backlog: iColumn;
  todo: iColumn;
  inProgress: iColumn;
  review: iColumn;
  done: iColumn;
}

const board: Board = {
  backlog: {
    id: "backlog",
    label: "Backlog",
    tasks: [],
  },

  todo: {
    id: "todo",
    label: "To Do",
    tasks: [],
  },

  inProgress: {
    id: "inProgress",
    label: "In Progress",
    tasks: [],
  },

  review: {
    id: "review",
    label: "Review",
    tasks: [],
  },

  done: {
    id: "done",
    label: "Done",
    tasks: [],
  },
};

const Dashboard: React.FC = () => {
  const { loading, error, data } = useQuery<{ allTasks: Task[] }>(
    GET_ALL_TASKS
  );
  const [moveTask, reponseMove] = useMutation<MoveTaskData, MoveTaskVars>(
    MOVE_TASK,
    {
      refetchQueries: [],
      fetchPolicy: "no-cache",
      update: () => {},
    }
  );
  const [items, setItems] = useState<Board>({ ...board });
  const [activeId, setActiveId] = useState<string | null>();

  useEffect(() => {
    if (data) {
      const newItems: Board = { ...board };
      data.allTasks.forEach((task) => {
        console.log("task", task);
        return newItems[task.status].tasks.push({
          id: task.id,
          title: task.title,
          description: task.description,
          depto: task.depto,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          comments: task.comments,
          attachments: task.attachments,
          position: task.position,
          status: task.status,
        });
      });
      setItems(newItems);
    }
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer: string = getContainer(active.id.toString());
    const overContainer: string = getContainer(over.id.toString());

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      const oldIndex = items[activeContainer].tasks.findIndex(
        (task: any) => task.id === active.id
      );
      const newIndex = items[overContainer].tasks.findIndex(
        (task: any) => task.id === over.id
      );

      try {
        const prev_to = items[activeContainer].tasks[newIndex - 1] || null;
        const next_to = items[activeContainer].tasks[newIndex + 1] || null;
        moveTask({
          variables: {
            id: active.id.toString(),
            status: activeContainer,
            prevTo: prev_to?.id.toString(),
            nextTo: next_to?.id.toString(),
          },
        });
        console.log("Task updated successfully!");
      } catch (err) {
        console.error("Error updating task:", err);
      }

      items[activeContainer].tasks = arrayMove(
        items[activeContainer].tasks,
        oldIndex,
        newIndex
      );

      setItems({ ...items });
    }

    if (activeContainer !== overContainer) {
      const tasksActive = items[activeContainer].tasks.find(
        (task: any) => task.id === active.id
      );
      if (tasksActive) {
        items[activeContainer].tasks = items[activeContainer].tasks.filter(
          (task: any) => task.id !== active.id
        );

        items[overContainer].tasks.push(tasksActive);
        setItems({ ...items });
      }
    }
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer: string = getContainer(active.id.toString());
    const overContainer: string = getContainer(over.id.toString());

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      const oldIndex = items[activeContainer].tasks.findIndex(
        (task: any) => task.id === active.id
      );
      const newIndex = items[overContainer].tasks.findIndex(
        (task: any) => task.id === over.id
      );

      items[activeContainer].tasks = arrayMove(
        items[activeContainer].tasks,
        oldIndex,
        newIndex
      );

      setItems({ ...items });
    }

    if (activeContainer !== overContainer) {
      const tasksActive = items[activeContainer].tasks.find(
        (task: any) => task.id === active.id
      );
      if (tasksActive) {
        items[activeContainer].tasks = items[activeContainer].tasks.filter(
          (task: any) => task.id !== active.id
        );

        items[overContainer].tasks.push(tasksActive);
        setItems({ ...items });
      }
    }
  };

  const getContainer = (id: string) => {
    for (const key in items) {
      const task = items[key].tasks.find((task: any) => task.id === id);
      if (task) {
        return key;
      }
    }
    return id;
  };

  const getTask = (activeId: string) => {
    for (const key in items) {
      const task = items[key].tasks.find((task: any) => task.id === activeId);
      if (task) {
        return task;
      }
    }
  };

  return (
    <>
      <div id="content" className="flex flex-1 w-full mt-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragMove={handleDragMove}
        >
          {Object.keys(items).map((item) => (
            <SortableContext
              items={items[item].tasks}
              strategy={rectSortingStrategy}
            >
              <Column
                key={items[item].id}
                id={items[item].id}
                title={items[item].label}
                totalTasks={items[item].tasks.length}
              >
                {items[item].tasks.length === 0 && (
                  <Cards key={-1} id={items[item].id} title="" />
                )}
                {items[item].tasks.map((task: any) => (
                  <Cards key={task.id} {...task} />
                ))}
              </Column>
            </SortableContext>
          ))}

          <DragOverlay>
            {activeId ? (
              <Cards
                key={activeId}
                id={activeId}
                title={getTask(activeId)?.title || ""}
                {...getTask(activeId)}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};

export default Dashboard;

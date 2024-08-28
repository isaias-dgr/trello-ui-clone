import React, { useEffect, useState } from "react";

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
import { board, Board } from "../../services/Task";
import useGetAllTasks from "../../services/GetTask";
import useMoveTask from "../../services/MoveTask";

const Dashboard: React.FC<{}> = () => {
  const [items, setItems] = useState<Board>(board);
  const [activeId, setActiveId] = useState<string | null>();
  const { loading: loadingMove, error: errorMove, move } = useMoveTask();

  const {
    loading: loadingGetAll,
    error: errorGetAll,
    tasks,
  } = useGetAllTasks();

  useEffect(() => {
    console.log("Tasks", loadingGetAll, tasks);
    setItems({ ...tasks });
  }, []);

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

      const prev_to = items[activeContainer].tasks[newIndex - 1] || null;
      const next_to = items[activeContainer].tasks[newIndex + 1] || null;

      move(
        active.id.toString(),
        activeContainer,
        prev_to?.id.toString(),
        next_to?.id.toString()
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
        // setItems({ ...items });
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

      if (oldIndex !== newIndex) {
        items[activeContainer].tasks = arrayMove(
          items[activeContainer].tasks,
          oldIndex,
          newIndex
        );
        // setItems({ ...items });
      }
    } else {
      const tasksActive = items[activeContainer].tasks.find(
        (task: any) => task.id === active.id
      );
      if (tasksActive) {
        items[activeContainer].tasks = items[activeContainer].tasks.filter(
          (task: any) => task.id !== active.id
        );

        items[overContainer].tasks.push(tasksActive);
        // setItems({ ...items });
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
            key={items[item].id}
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
  );
};

export default Dashboard;

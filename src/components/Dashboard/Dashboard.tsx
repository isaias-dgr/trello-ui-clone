import React, { act, lazy, useState } from "react";
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
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "../Column/Column";
import Cards from "../Cards/Cards";

const board = {
  backlog: {
    id: "backlog",
    label: "Backlog",
    tasks: [
      {
        id: "1",
        title: "Implement login functionality",
        description:
          "Develop and integrate the login feature with the authentication API.",
        team: "Frontend",
        date: "2024-08-15",
        comments: 3,
        attachs: 2,
        user: {
          id: 101,
          firstName: "Alice",
          lastName: "Smith",
          avatar: "https://example.com/avatars/alice.jpg",
          team: "Frontend",
        },
      },
      {
        id: "2",
        title: "Design landing page",
        description:
          "Create initial designs for the new marketing landing page.",
        team: "Design",
        date: "2024-08-16",
        comments: 5,
        attachs: 3,
        user: {
          id: 102,
          firstName: "Bob",
          lastName: "Johnson",
          avatar: "https://example.com/avatars/bob.jpg",
          team: "Design",
        },
      },
      {
        id: "3",
        title: "Research OAuth2.0 implementation",
        description:
          "Research and document the implementation details for OAuth2.0 authentication.",
        team: "Backend",
        date: "2024-08-17",
        comments: 2,
        attachs: 1,
        user: {
          id: 107,
          firstName: "Grace",
          lastName: "Kim",
          avatar: "https://example.com/avatars/grace.jpg",
          team: "Backend",
        },
      },
    ],
  },

  todo: {
    id: "todo",
    label: "To Do",
    tasks: [
      {
        id: "4",
        title: "Set up CI/CD pipeline",
        description:
          "Configure the continuous integration and deployment pipeline for the project.",
        team: "DevOps",
        date: "2024-08-17",
        comments: 2,
        attachs: 1,
        user: {
          id: 103,
          firstName: "Charlie",
          lastName: "Lee",
          avatar: "https://example.com/avatars/charlie.jpg",
          team: "DevOps",
        },
      },
      {
        id: "5",
        title: "Create unit tests for user service",
        description:
          "Write unit tests to cover the user service functionality.",
        team: "Backend",
        date: "2024-08-18",
        comments: 3,
        attachs: 1,
        user: {
          id: 108,
          firstName: "Hannah",
          lastName: "Brown",
          avatar: "https://example.com/avatars/hannah.jpg",
          team: "Backend",
        },
      },
    ],
  },

  inProgress: {
    id: "inProgress",
    label: "In Progress",
    tasks: [
      {
        id: "6",
        title: "Develop user profile page",
        description:
          "Create the user profile page and integrate with the backend.",
        team: "Backend",
        date: "2024-08-18",
        comments: 4,
        attachs: 2,
        user: {
          id: 104,
          firstName: "Diana",
          lastName: "Garcia",
          avatar: "https://example.com/avatars/diana.jpg",
          team: "Backend",
        },
      },
      {
        id: "7",
        title: "Optimize image loading",
        description:
          "Optimize the loading of images on the landing page to improve performance.",
        team: "Frontend",
        date: "2024-08-19",
        comments: 1,
        attachs: 1,
        user: {
          id: 109,
          firstName: "Irene",
          lastName: "Lopez",
          avatar: "https://example.com/avatars/irene.jpg",
          team: "Frontend",
        },
      },
      {
        id: "8",
        title: "Integrate third-party analytics",
        description:
          "Integrate third-party analytics to monitor user activity on the platform.",
        team: "DevOps",
        date: "2024-08-20",
        comments: 2,
        attachs: 0,
        user: {
          id: 110,
          firstName: "Jack",
          lastName: "Wilson",
          avatar: "https://example.com/avatars/jack.jpg",
          team: "DevOps",
        },
      },
    ],
  },

  review: {
    id: "review",
    label: "Review",
    tasks: [
      {
        id: "9",
        title: "Code review for login feature",
        description:
          "Review the code for the login functionality implemented by the frontend team.",
        team: "Frontend",
        date: "2024-08-19",
        comments: 1,
        attachs: 0,
        user: {
          id: 105,
          firstName: "Evan",
          lastName: "Martinez",
          avatar: "https://example.com/avatars/evan.jpg",
          team: "Frontend",
        },
      },
      {
        id: "10",
        title: "Review API documentation",
        description:
          "Review the API documentation for accuracy and completeness.",
        team: "Backend",
        date: "2024-08-20",
        comments: 0,
        attachs: 0,
        user: {
          id: 111,
          firstName: "Karen",
          lastName: "Davis",
          avatar: "https://example.com/avatars/karen.jpg",
          team: "Backend",
        },
      },
      {
        id: "11",
        title: "Design review for new feature",
        description:
          "Review the designs for the new feature before implementation begins.",
        team: "Design",
        date: "2024-08-21",
        comments: 3,
        attachs: 1,
        user: {
          id: 112,
          firstName: "Leo",
          lastName: "Morris",
          avatar: "https://example.com/avatars/leo.jpg",
          team: "Design",
        },
      },
    ],
  },

  done: {
    id: "done",
    label: "Done",
    tasks: [
      {
        id: "12",
        title: "Setup project repository",
        description:
          "Initialize the project repository and push the initial commit.",
        team: "DevOps",
        date: "2024-08-14",
        comments: 0,
        attachs: 0,
        user: {
          id: 106,
          firstName: "Fiona",
          lastName: "Wang",
          avatar: "https://example.com/avatars/fiona.jpg",
          team: "DevOps",
        },
      },
      {
        id: "13",
        title: "Complete user onboarding process",
        description: "Finish the development of the user onboarding process.",
        team: "Frontend",
        date: "2024-08-13",
        comments: 2,
        attachs: 1,
        user: {
          id: 113,
          firstName: "Mia",
          lastName: "Walker",
          avatar: "https://example.com/avatars/mia.jpg",
          team: "Frontend",
        },
      },
      {
        id: "14",
        title: "Implement password reset",
        description: "Develop and test the password reset functionality.",
        team: "Backend",
        date: "2024-08-12",
        comments: 1,
        attachs: 0,
        user: {
          id: 114,
          firstName: "Noah",
          lastName: "Carter",
          avatar: "https://example.com/avatars/noah.jpg",
          team: "Backend",
        },
      },
      {
        id: "15",
        title: "Deploy initial version to staging",
        description:
          "Deploy the initial version of the application to the staging environment.",
        team: "DevOps",
        date: "2024-08-11",
        comments: 0,
        attachs: 0,
        user: {
          id: 115,
          firstName: "Olivia",
          lastName: "Taylor",
          avatar: "https://example.com/avatars/olivia.jpg",
          team: "DevOps",
        },
      },
    ],
  },
};

const Dashboard: React.FC = () => {
  const [items, setItems] = useState<{ [key: string]: any }>(board);
  const [activeId, setActiveId] = useState<string | null>();

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
      items[activeContainer].tasks = items[activeContainer].tasks.filter(
        (task: any) => task.id !== active.id
      );

      items[overContainer].tasks.push(tasksActive);
      setItems({ ...items });
    }
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;
    if (!over) return;

    console.log("handleDragMove active", active.id, "over", over.id);
    const activeContainer: string = getContainer(active.id.toString());
    const overContainer: string = getContainer(over.id.toString());
    console.log(
      "handleDragMove activeContainer",
      activeContainer,
      "overContainer",
      overContainer
    );
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
      items[activeContainer].tasks = items[activeContainer].tasks.filter(
        (task: any) => task.id !== active.id
      );

      items[overContainer].tasks.push(tasksActive);
      setItems({ ...items });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto ">
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
          {activeId ? <Cards key={activeId} {...getTask(activeId)} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Dashboard;

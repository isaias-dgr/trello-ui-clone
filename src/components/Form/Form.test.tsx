import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Form from "./Form";

test("renders Form component and adds a new task", () => {
  const mockAddTask = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <Form onAddTask={mockAddTask} />
  );

  const input = getByPlaceholderText("New Task");
  const button = getByText("Add Task");

  fireEvent.change(input, { target: { value: "New Test Task" } });
  fireEvent.click(button);

  expect(mockAddTask).toHaveBeenCalledWith("New Test Task");
});

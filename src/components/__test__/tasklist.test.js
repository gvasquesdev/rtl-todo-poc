import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskList from "../tasklist";


afterEach(() => {
    cleanup();
});

test("Should render container and add-task-input", ()=> {
    render(<TaskList/>);
    const taskContainer = screen.getByTestId("task-container");
    const addTaskInput = screen.getByTestId("add-task-input");

    expect(taskContainer).toBeInTheDocument();
    expect(addTaskInput).toBeInTheDocument();
});

test("Should show an alert informing the user to not send empty tasks",async ()=> {
    const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    const user = userEvent.setup();
    render(<TaskList/>);
    const taskContainer = screen.getByTestId("task-container");
    const addTaskInput = screen.getByTestId("add-task-input");
    const emptyTask = addTaskInput.value;
    await user.click(screen.getByRole("button", {name: "Adicionar"}));

    expect(taskContainer).toBeInTheDocument();
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(emptyTask).toBe(undefined);
});

test("Should add a new task", async ()=> {
    const user = userEvent.setup();
    render(<TaskList/>);
    const taskContainer = screen.getByTestId("task-container");
    const addTaskInput = screen.getByTestId("add-task-input");
    const mockText = "Qualquer Tarefa";
    const getTaskInputTextbox = screen.getByRole("textbox");
    await user.type(getTaskInputTextbox, mockText);
    await user.click(screen.getByTestId("add-task-button", {name: "Adicionar"}));
    const getTaskItem = screen.getByTestId("task-list-item");

    expect(taskContainer).toBeInTheDocument();
    expect(addTaskInput).toBeInTheDocument();
    expect(getTaskItem).toHaveTextContent(mockText);
});
/* eslint-disable no-undef */

const todoList = require('../todo.js');

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  beforeEach(() => {
    // Reset the to-do list before each test
    all.length = 0;
  });

  test("Should add a todo item", () => {
    const todoItemsCount = all.length;
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark as complete", () => {
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should return overdue todos", () => {
    add({
      title: "Overdue todo",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10),
    });
    const overdueTodos = overdue();
    expect(overdueTodos.length).toBe(1);
    expect(overdueTodos[0].title).toBe("Overdue todo");
  });

  test("Should return todos due today", () => {
    add({
      title: "Today todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    const todayTodos = dueToday();
    expect(todayTodos.length).toBe(1);
    expect(todayTodos[0].title).toBe("Today todo");
  });

  test("Should return todos due later", () => {
    add({
      title: "Future todo",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10),
    });
    const laterTodos = dueLater();
    expect(laterTodos.length).toBe(1);
    expect(laterTodos[0].title).toBe("Future todo");
  });
});

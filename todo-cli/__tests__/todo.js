/* eslint-disable no-undef */

const todoList = require('../todo.js');
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
  });

  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "another test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue todos", () => {
    const overdueTodos = overdue();
    expect(overdueTodos.every(todo => todo.dueDate < new Date().toISOString().slice(0, 10))).toBe(true);
  });

  test("Should retrieve due today todos", () => {
    const todayTodos = dueToday();
    expect(todayTodos.every(todo => todo.dueDate === new Date().toISOString().slice(0, 10))).toBe(true);
  });

  test("Should retrieve due later todos", () => {
    const laterTodos = dueLater();
    expect(laterTodos.every(todo => todo.dueDate > new Date().toISOString().slice(0, 10))).toBe(true);
  });
});

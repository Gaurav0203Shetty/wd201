/* eslint-disable no-undef */
const todoList = require('./todo.js');

describe("Todolist Test Suite", () => {
  let todos;

  beforeAll(() => {
    todos = todoList();
    todos.add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
  });

  test("Should add new todo", () => {
    const todoItemsCount = todos.all.length;
    todos.add({
      title: "another test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(todos.all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark todo as complete", () => {
    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("Should retrieve overdue todos", () => {
    const overdueTodos = todos.overdue();
    expect(overdueTodos.every(todo => todo.dueDate < new Date().toISOString().slice(0, 10))).toBe(true);
  });

  test("Should retrieve due today todos", () => {
    const todayTodos = todos.dueToday();
    expect(todayTodos.every(todo => todo.dueDate === new Date().toISOString().slice(0, 10))).toBe(true);
  });

  test("Should retrieve due later todos", () => {
    const laterTodos = todos.dueLater();
    expect(laterTodos.every(todo => todo.dueDate > new Date().toISOString().slice(0, 10))).toBe(true);
  });
});
module.exports = todoList;
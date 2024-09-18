/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const todoList = require('../todo.js');

// Destructure all the functions from the actual implementation
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Checking with wrong implementation", () => {
  const mockTodoList = {
    all: [],

    // Mock add method: Doesn't actually add a todo item
    add: (_todoItem) => {
      // Don't modify the all array, keeping it empty
    },

    // Mock markAsComplete: Doesn't mark as complete
    markAsComplete: (_index) => {
      // No action, so todos remain incomplete
    },

    // Mock overdue: Always returns an empty array, even if there are overdue items
    overdue: () => {
      return [];
    },

    // Mock dueToday: Always returns an empty array, even if there are items due today
    dueToday: () => {
      return [];
    },

    // Mock dueLater: Always returns an empty array, even if there are items due later
    dueLater: () => {
      return [];
    }
  };

  test("Should fail to add a todo item", () => {
    const todoItemsCount = mockTodoList.all.length;
    mockTodoList.add({
      title: "another test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(mockTodoList.all.length).toBe(todoItemsCount + 1); 
  });

  test("Should fail to mark todo as complete", () => {
    mockTodoList.add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    mockTodoList.markAsComplete(0);
    expect(mockTodoList.all[0]?.completed).toBe(true); 
  });

  test("Should fail to retrieve overdue todos", () => {
    mockTodoList.add({
      title: "Submit assignment",
      completed: false,
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10), 
    });
    const overdueTodos = mockTodoList.overdue();
    expect(overdueTodos.length).toBeGreaterThan(0); 
  });

  test("Should fail to retrieve due today todos", () => {
    mockTodoList.add({
      title: "Pay rent",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10), 
    });
    const todayTodos = mockTodoList.dueToday();
    expect(todayTodos.length).toBeGreaterThan(0); 
  });

  test("Should fail to retrieve due later todos", () => {
    mockTodoList.add({
      title: "File taxes",
      completed: false,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    });
    const laterTodos = mockTodoList.dueLater();
    expect(laterTodos.length).toBeGreaterThan(0); 
  });
});

describe("Checking with actual implementation", () => {
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

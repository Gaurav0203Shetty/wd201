const todoList = require('../todo.js');

const {all, markAsComplete, add} = todoList();

describe("Todolist Test Suite", () => {
    beforeAll(() => {
        add(
            {
                title: "test todo",
                completed: false,
                dueDate: new Date().toISOString().slice(0, 10)
            }
        )
    })
    
    test("Should add new todo", () => {
        const todoItemsCount = all.length;
        add(
            {
                title: "test todo",
                completed: false,
                dueDate: new Date().toISOString().slice(0, 10)
            }
        )
        expect(all.length).toBe(todoItemsCount + 1);
    })

    test("Should mark todo as complete", ()  => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    })
})
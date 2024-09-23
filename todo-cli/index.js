/* eslint-disable no-unused-vars */

const { connect } = require("./connectDB.js");
const Todo = require("./TodoModel.js");

const createTodo = async () => {
  try {
    await connect(); // Ensure the database connection is established
    const todo = await Todo.create({
      title: "first item",
      dueDate: new Date(), // Assign today's date
      complete: false,
    });
    console.log(`Created todo with ID : ${todo.id}`);
  } catch (error) {
    console.log("Error creating todo:", error);
  }
};

const countItems = async () => {
    try {
        const totalCount = await Todo.count();
        console.log(`Found ${totalCount} items in the table`);
    } catch(error) {
        console.log(error);
    }
}

const getAllTodos = async () => {
    try {
        const todos = await Todo.findAll();
        const todoList = todos.map(todo => todo.displayableString()).join("\n");
        console.log(todoList)
    } catch(error) {
        console.log(error);
    }
}

//(async () => {
  //await createTodo();
  //await countItems();
  //await getAllTodos();
//})();

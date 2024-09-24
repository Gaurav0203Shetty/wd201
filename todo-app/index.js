const express = require("express");
const app = express();
const { Todo } = require("./models"); // Import from models/index.js
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// GET route to fetch all todos
app.get("/todos", async (request, response) => {
    try {
        const todos = await Todo.findAll(); // Fetch all todos from the database
        return response.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        return response.status(500).json({ error: "Failed to fetch todos" });
    }
});

// POST route to create a new todo
app.post("/todos", async (request, response) => {
    console.log("Create a todo", request.body); // Log the incoming request body
    try {
        const todo = await Todo.addTodo({
            title: request.body.title,
            dueDate: request.body.dueDate,
            completed: false
        });
        console.log("Created todo:", todo); // Log the created todo
        return response.json(todo);
    } catch (error) {
        console.log(error);
        return response.status(422).json(error);
    }
});

// PUT route to mark a todo as completed
app.put("/todos/:id/markAsCompleted", async (request, response) => {
    console.log("We have to update a todo with ID:", request.params.id);
    const todo = await Todo.findByPk(request.params.id);
    try {
        const updatedTodo = Todo.markAsCompleted()
        return response.json(updatedTodo)
    } catch(error) {
        console.log(error);
        return response.status(422).json(error);
    }
});

// DELETE route to delete a todo by ID
app.delete("/todos/:id", async (request, response) => {
    console.log("Delete a todo by ID:", request.params.id);
    try {
        const deleted = await Todo.destroy({ where: { id: request.params.id } });
        if (deleted) {
            return response.json({ message: "Todo deleted successfully" });
        } else {
            return response.status(404).json({ error: "Todo not found" });
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }
});

app.listen(3000, () => {
    console.log("Started listening on port 3000");
});

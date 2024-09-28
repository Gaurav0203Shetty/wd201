/* eslint-disable no-unused-vars */
// app.js
const express = require("express");
const app = express();
const { Todo } = require("./models"); // Import from models/index.js
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.set("view engine", "ejs");

app.get("/", (request, response) => {
    response.render("index.ejs");
})

app.get("/todos", (request, response) => {
    console.log("todo list", request.body);
})

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
    try {
        console.log("We have to update a todo with ID:", request.params.id);
        
        // Find the todo by ID
        const todo = await Todo.findByPk(request.params.id);
        
        if (todo) {
            // Mark the todo as complete
            todo.completed = true;
            await todo.save();  // Save the updated todo
            
            return response.json(todo);  // Send back the updated todo
        } else {
            return response.status(404).json({ error: "Todo not found" });
        }
    } catch (error) {
        console.log("Error updating todo:", error);
        return response.status(500).json({ error: "An error occurred" });
    }
});


// DELETE route to delete a todo by ID
app.delete("/todos/:id", async (request, response) => {
    console.log("Delete a todo by ID:", request.params.id);
    try {
        // Sequelize destroy method returns the number of rows affected
        const deleted = await Todo.destroy({ where: { id: request.params.id } });
        if (deleted) {
            return response.json(true); // Return true if the todo was deleted
        } else {
            return response.json(false); // Return false if the todo was not found
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }
});

module.exports = app;
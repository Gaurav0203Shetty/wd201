/* eslint-disable no-undef */
const request = require("supertest");
const db = require("../models/index.js");
const app = require("../app.js");

let server, agent;

describe("Todo test suite", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true});
        server = app.listen(3000, () => { });
        agent = request.agent(server);
    });
    
    afterAll(async () => {
        await db.sequelize.close();
        server.close();
    });
    
    test("responds with json at /todos", async () => {
        const response = await agent.post("/todos").send({
            title: "Buy milk",
            dueDate: new Date().toISOString(),
            completed: false,
        });
        expect(response.statusCode).toBe(200);
        expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
        const parsedResponse = JSON.parse(response.text);
        expect(parsedResponse.id).toBeDefined();
    });
    
    test("Mark a todo as complete", async () => {
        const response = await agent.post("/todos").send({
            title: "Buy milk",
            dueDate: new Date().toISOString(),
            completed: false,
        });
        const parsedResponse = JSON.parse(response.text);
        const todoID = parsedResponse.id;
        expect(parsedResponse.completed).toBe(false);
        const markCompleteResponse = await agent.put(`/todos/${todoID}/markAsCompleted`).send();
        const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
        expect(parsedUpdateResponse.completed).toBe(true);
    });
    
    test("Deletes a todo by ID", async () => {
        // Create a todo
        const response = await agent.post("/todos").send({
            title: "Delete this todo",
            dueDate: new Date().toISOString(),
            completed: false,
        });
        const parsedResponse = JSON.parse(response.text);
        const todoID = parsedResponse.id;
        
        // Delete the created todo
        const deleteResponse = await agent.delete(`/todos/${todoID}`).send();
        const parsedDeleteResponse = JSON.parse(deleteResponse.text);
        expect(parsedDeleteResponse).toBe(true);
        
        // Try deleting the same todo again, should return false
        const repeatDeleteResponse = await agent.delete(`/todos/${todoID}`).send();
        const parsedRepeatDeleteResponse = JSON.parse(repeatDeleteResponse.text);
        expect(parsedRepeatDeleteResponse).toBe(false);
    });
});

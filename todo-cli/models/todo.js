"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      console.log(overdueItems.map((item) => item.displayableString()).join("\n"));

      console.log("\nDue Today");
      const dueItems = await Todo.dueToday();
      console.log(dueItems.map((item) => item.displayableString()).join("\n"));

      console.log("\nDue Later");
      const dueLaterItems = await Todo.dueLater();
      console.log(dueLaterItems.map((item) => item.displayableString()).join("\n"));
    }

    // Find all overdue items
    static async overdue() {
      return Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    // Find all items due today
    static async dueToday() {
      return Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    // Find all items due later
    static async dueLater() {
      return Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    // Mark task as complete
    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    }

    // Display string for each todo item
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let date = this.dueDate === new Date().toLocaleDateString("en-CA") ? "" : this.dueDate;
      return `${this.id}. ${checkbox} ${this.title} ${date}`.trim();
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};

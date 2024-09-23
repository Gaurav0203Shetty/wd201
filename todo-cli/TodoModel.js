/* eslint-disable no-unused-vars */

const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("./connectDB.js");

class Todo extends Model {

    static async addTask(params) {
        return await Todo.create(params);
    }

    displayableString() {
        return `${this.completed ? '[x]' : '[ ]'} ${this.id}. ${this.title} - ${this.dueDate}`;
    }
}

Todo.init(
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize, // Passing the connection instance
    modelName: 'Todo', // Optional: Define the model name explicitly
  }
);

// Ensure the table is created in the database
Todo.sync()
  .then(() => {
    console.log("The 'todos' table has been created.");
  })
  .catch((error) => {
    console.error("Error creating table:", error);
  });

module.exports = Todo;

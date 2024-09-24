'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    // Define any static methods or associations here if needed
    static addTodo({title, dueDate}) {
      return this.create({title: title, dueDate: dueDate, completed: false})
    }
    markAsCompletedd() {
      return this.update({ completed: true })
    }
  }

  // Initialize the Todo model with necessary attributes
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Title is required
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false, // Due date is required
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default value for completed is false
    }
  }, {
    sequelize, // Attach this model to the Sequelize instance
    modelName: 'Todo', // The model's name
  });

  return Todo;
};

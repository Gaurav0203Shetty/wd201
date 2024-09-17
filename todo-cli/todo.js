const todoList = () => {
  let all = [];
  
  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    if (all[index]) {
      all[index].completed = true;
    }
  };

  const overdue = () => {
    const today = formattedDate(new Date());
    return all.filter((todo) => todo.dueDate < today);
  };

  const dueToday = () => {
    const today = formattedDate(new Date());
    return all.filter((todo) => todo.dueDate === today);
  };

  const dueLater = () => {
    const today = formattedDate(new Date());
    return all.filter((todo) => todo.dueDate > today);
  };

  const toDisplayableList = (list) => {
    const today = formattedDate(new Date());
    return list
      .map((todo) => {
        const checkbox = todo.completed ? "[x]" : "[ ]";
        const displayDate = todo.dueDate === today ? "" : ` ${todo.dueDate}`;
        return `${checkbox} ${todo.title}${displayDate}`;
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

module.exports = todoList;

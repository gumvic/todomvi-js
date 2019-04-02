const uuid = require("uuid/v1");

const state = {
  newTodoTitle: "",
  todos: [
    { id: uuid(), title: "Coffee", done: true },
    { id: uuid(), title: "Work", done: false },
    { id: uuid(), title: "Sleep", done: false }
  ],
  editedTodoId: undefined,
  editedTodoTitle: "",
  selectedFilterId: "all"
};

module.exports = state;

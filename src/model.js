const uuid = require("uuid/v1");

function updateNewTodoTitle(state, { title }) {
  return {
    ...state,
    newTodoTitle: title
  };
}

function saveNewTodo(state, msg) {
  if (state.newTodoTitle) {
    const id = uuid();
    const title = state.newTodoTitle;
    return {
      ...state,
      newTodoTitle: "",
      todos: [...state.todos, { id, title }]
    };
  }
  else {
    return state;
  }
}

function editTodo(state, { id }) {
  return {
    ...state,
    editedTodoId: id,
    editedTodoTitle: state.todos.filter((todo) => todo.id === id)[0].title
  };
}

function updateEditedTodoTitle(state, { title }) {
  return {
    ...state,
    editedTodoTitle: title
  };
}

function saveEditedTodo(state, { id }) {
  if (state.editedTodoId && state.editedTodoTitle) {
    const id = state.editedTodoId;
    const title = state.editedTodoTitle;
    return {
      ...state,
      editedTodoId: undefined,
      editedTodoTitle: "",
      todos: state.todos.map((todo) => todo.id === id ? { ...todo, title } : todo)
    };
  }
  else {
    return {
      ...state,
      editedTodoId: undefined,
      editedTodoTitle: ""
    };
  }
}

function toggleTodo(state, { id }) {
  return {
    ...state,
    todos: state.todos.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo)
  };
}

function removeTodo(state, { id }) {
  return {
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id)
  };
}

function toggleAllTodos(state, msg) {
  const allTodosDone = !state.todos.filter((todo) => !todo.done).length;
  return {
    ...state,
    todos: state.todos.map((todo) => ({ ...todo, done: !allTodosDone }))
  };
}

function removeDoneTodos(state, msg) {
  return {
    ...state,
    todos: state.todos.filter((todo) => !todo.done)
  };
}

function selectFilter(state, { id }) {
  return {
    ...state,
    selectedFilterId: id
  };
}

function model(state, msg) {
  switch(msg.type) {
    case "updateNewTodoTitle": return updateNewTodoTitle(state, msg);
    case "saveNewTodo": return saveNewTodo(state, msg);
    case "editTodo": return editTodo(state, msg);
    case "updateEditedTodoTitle": return updateEditedTodoTitle(state, msg);
    case "saveEditedTodo": return saveEditedTodo(state, msg);
    case "toggleTodo": return toggleTodo(state, msg);
    case "removeTodo": return removeTodo(state, msg);
    case "toggleAllTodos": return toggleAllTodos(state, msg);
    case "removeDoneTodos": return removeDoneTodos(state, msg);
    case "selectFilter": return selectFilter(state, msg);
    default: throw Error(`Unknown message type ${msg.type}`);
  }
}

module.exports = model;

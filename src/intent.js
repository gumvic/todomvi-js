function keyupNewTodoTitle(evt, pin) {
  return {
    type: "updateNewTodoTitle",
    title: evt.target.value
  };
}

function blurNewTodoTitle(evt, pin) {
  return {
    type: "saveNewTodo"
  };
}

function dblclickTodoTitle(evt, { id }) {
  return {
    type: "editTodo",
    id
  };
}

function keyupTodoEditedTitle(evt, pin) {
  return {
    type: "updateEditedTodoTitle",
    title: evt.target.value
  };
}

function blurTodoEditedTitle(evt, pin) {
  return {
    type: "saveEditedTodo"
  };
}

function clickTodoDone(evt, { id }) {
  return {
    type: "toggleTodo",
    id
  };
}

function clickTodoRemove(evt, { id }) {
  return {
    type: "removeTodo",
    id
  };
}

function clickToggleAllTodos(evt, pin) {
  return {
    type: "toggleAllTodos"
  };
}

function clickRemoveDoneTodos(evt, pin) {
  return {
    type: "removeDoneTodos"
  };
}

function clickSelectFilter(evt, { id }) {
  return {
    type: "selectFilter",
    id
  };
}

function intent(evt, pin) {
  switch(`${evt.type} ${pin.type}`) {
    case "keyup newTodoTitle": return keyupNewTodoTitle(evt, pin);
    case "blur newTodoTitle": return blurNewTodoTitle(evt, pin);
    case "dblclick todoTitle": return dblclickTodoTitle(evt, pin);
    case "keyup todoEditedTitle": return keyupTodoEditedTitle(evt, pin);
    case "blur todoEditedTitle": return blurTodoEditedTitle(evt, pin);
    case "click todoDone": return clickTodoDone(evt, pin);
    case "click todoRemove": return clickTodoRemove(evt, pin);
    case "click toggleAllTodos": return clickToggleAllTodos(evt, pin);
    case "click removeDoneTodos": return clickRemoveDoneTodos(evt, pin);
    case "click selectFilter": return clickSelectFilter(evt, pin);
    default: return;
  }
}

module.exports = intent;

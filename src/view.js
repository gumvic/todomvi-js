const { h } = require("mvi-js");

const FILTERS = [
  { id: "all", title: "All", filter: () => true },
  { id: "notDone", title: "Active", filter: (todo) => !todo.done },
  { id: "done", title: "Completed", filter: (todo) => !!todo.done }
];

function viewHeader({ newTodoTitle }) {
  return <header className="header">
    <h1>Todos</h1>
    <input pin={{ type: "newTodoTitle" }} className="new-todo" placeholder="What else?" value={newTodoTitle}/>
  </header>;
}

function viewTodo({ id, title, done, edited }) {
  const view = <div className="view">
    <input pin={{ type: "todoDone", id }} type="checkbox" className="toggle" checked={!!done}/>
    <label pin={{ type: "todoTitle", id }} className="title">{title}</label>
    <button pin={{ type: "todoRemove", id }} className="destroy"/>
  </div>;
  const edit = <input pin={{ type: "todoEditedTitle", id }} className="edit" value={title}/>;
  return <li key={id} className={`${done && "completed"} ${edited && "editing"}`}>
    {edited ? edit : view}
  </li>;
}

function viewMain({ todos, editedTodoId, editedTodoTitle, selectedFilterId, todosLeft }) {
  const { filter } = FILTERS.filter(({ id }) => id === selectedFilterId)[0];
  return <section className="main">
    <label pin={{ type: "toggleAllTodos" }} className={`toggle-all ${!todosLeft && "toggled"}`}>
      Mark all as complete
    </label>
    <ul className="todo-list">
      {todos.filter(filter).map((todo) => {
        const edited = todo.id === editedTodoId;
        const title = edited ? editedTodoTitle : todo.title;
        return viewTodo({ ...todo, edited, title });
      })}
    </ul>
  </section>;
}

function viewFilter({ id, title, selected }) {
  return <li key={id}>
    <a pin={{ type: "selectFilter", id }} className={`${selected && "selected"}`}>
      {title}
    </a>
  </li>;
}

function viewFooter({ selectedFilterId, todosLeft }) {
  const todosLeftCaption = todosLeft ?
    `${todosLeft} ${todosLeft > 1 ? "todos" : "todo"} left` :
    "All done";
  return <footer className="footer">
    <span className="todo-count">{todosLeftCaption}</span>
    <ul className="filters">
      {FILTERS.map((filter) =>
        viewFilter({ ...filter, selected: filter.id === selectedFilterId }))}
    </ul>
    <button pin={{ type: "removeDoneTodos" }} className="clear-completed">
      Clear completed
    </button>
  </footer>;
}

function view({ newTodoTitle, todos, editedTodoId, editedTodoTitle, selectedFilterId }) {
  const todosLeft = todos.filter((todo) => !todo.done).length;
  return <div>
    <section className="todoapp">
      {viewHeader({ newTodoTitle })}
      {viewMain({ todos, editedTodoId, editedTodoTitle, selectedFilterId, todosLeft })}
      {viewFooter({ selectedFilterId, todosLeft })}
    </section>
    <footer className="info">
      <p>Double-click to edit a todo</p>
    </footer>
  </div>;
}

module.exports = view;

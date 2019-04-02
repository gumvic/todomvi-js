const { app, mount } = require("mvi-js");
const model = require("./src/model");
const view = require("./src/view");
const intent = require("./src/intent");
const state = require("./src/state");

function main() {
  const todoApp = app({
    model,
    view,
    intent,
    state
  });
  mount(todoApp, document.getElementById("todoApp"));
}

main();

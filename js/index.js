import addTodo from "./todo-list/add-todo.js";
import getTodos from "./todo-list/get-todos.js";

const d = document;

d.addEventListener("DOMContentLoaded", e => {
    getTodos();
    addTodo("inputTodo");
} );
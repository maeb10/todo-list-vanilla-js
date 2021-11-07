import addTodo      from "./todo-list/add-todo.js";
import deleteTodo   from "./todo-list/delete-todo.js";
import getTodos     from "./todo-list/get-todos.js";
import completeTodo from "./todo-list/complete-todo.js";
import filterTodos  from "./todo-list/filter-todos.js";

const d = document;

d.addEventListener("DOMContentLoaded", e => {
    getTodos();
    addTodo("inputTodo");
    deleteTodo("button.destroy", ".todo-list");
    completeTodo("input.toggle", ".todo-list", "toggle-all");
    filterTodos("todos-all", "todos-pending", "todos-completed", "todos-completed-delete");
} );
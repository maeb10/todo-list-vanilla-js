import getTodos from "./get-todos.js";
import {Todo} from "./Todo.js";

const d  = document,
      ls = localStorage;

// Agrega el nuevo Todo al Local Storage
const addTodoLS = (title) => {
    const todoListArr = JSON.parse(ls.getItem("todoList")) || [],
          newTodo = new Todo(title);
    todoListArr.push(newTodo);
    ls.setItem("todoList", JSON.stringify(todoListArr))
    getTodos();
}

export default function addTodo(id){
    const $inputTodo = d.getElementById(id);
    
    $inputTodo.addEventListener("keyup", e => {
        if( e.keyCode === 13 && e.target.value.trim() != ""){
            addTodoLS($inputTodo.value);
            $inputTodo.value = "";
        }
    });
}
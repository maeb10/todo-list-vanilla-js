import getTodos from "./get-todos.js";

const d  = document,
      ls = localStorage;

// Borra el Todo del Local Storage
const deleteTodoLS = (idTodo) => {
    let todoListArr = JSON.parse(ls.getItem("todoList"));
    todoListArr = todoListArr.filter( todo => todo.id != idTodo );
    if( todoListArr.length > 0 ){
        ls.setItem("todoList", JSON.stringify(todoListArr))
    }else{
        ls.removeItem("todoList");
    }
    getTodos();
}

export default function deleteTodo(btnDestroy, btnParent){
    const $btnParent  = d.querySelector(btnParent);
    
    $btnParent.addEventListener("click", e => {
        if(e.target.matches(btnDestroy)){
            let idTodo = e.target.parentElement.parentElement.dataset.id;
            deleteTodoLS(idTodo);
        }
    });
}
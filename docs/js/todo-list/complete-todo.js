import getTodos from "./get-todos.js";
const d  = document,
      ls = localStorage;

// Cambiar el estatus del To do en el Local Storage
const changeStatus = (id) => {
    const todoListArr = JSON.parse(ls.getItem("todoList"));
    let indexFound = todoListArr.findIndex( el => el.id == id);

    if( todoListArr[indexFound].estatus == 'pendiente' )
        todoListArr[indexFound].estatus = 'terminado';
    else 
        todoListArr[indexFound].estatus = 'pendiente';
    
    ls.setItem("todoList", JSON.stringify(todoListArr))
    getTodos();
}

// Cambiar el estatus de todos los To do en el Local Storage
const changeStatusAll = (check) => {
    const todoListArr    = JSON.parse(ls.getItem("todoList")) || [];
    let   todoListArrNew = [];
    
    todoListArrNew = ( check ) ? todoListArr.map( ( {id, title} ) => ( {id, title, estatus:'terminado'} ) )
                               : todoListArr.map( ( {id, title} ) => ( {id, title, estatus:'pendiente'} ) );
    
    ls.setItem("todoList", JSON.stringify(todoListArrNew))
    getTodos(); 
}

export default function completeTodo(checkComplete, todoListContainer, checkCompleteAll){
    const $todoListContainer = d.querySelector(todoListContainer),
          $checkCompleteAll  = d.getElementById(checkCompleteAll);
    
    // Cambia el estatus de un To do
    $todoListContainer.addEventListener("click", e => {
        if( e.target.matches(checkComplete) ) {
            let $todoLi = e.target.parentElement.parentElement;
            changeStatus($todoLi.dataset.id);
        }
    });

    // Cambia los estatus de todos los To do
    $checkCompleteAll.addEventListener("click", e => {
        if(e.target.checked)
            changeStatusAll(true);
        else
            changeStatusAll(false);
    });

}
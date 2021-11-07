import getTodos from "./get-todos.js";
const d  = document,
      ls = localStorage;

export default function filterTodos( todosAll, todosPending, todosCompleted, todosCompletedDel ) {
    const $btnAll          = d.getElementById(todosAll),
          $btnPending      = d.getElementById(todosPending),
          $btnCompleted    = d.getElementById(todosCompleted),
          $btnCompletedDel = d.getElementById(todosCompletedDel);
          
    let todoListArrNew     = [];

    $btnAll.addEventListener("click", e => {
        e.preventDefault();
        getTodos();
    });
    
    
    $btnPending.addEventListener("click", e => {
        e.preventDefault();
        $btnPending.classList.add("selected");
        $btnAll.classList.remove("selected");
        $btnCompleted.classList.remove("selected");

        const todoListArr = JSON.parse(ls.getItem("todoList")) || [];

        todoListArrNew    = todoListArr.filter( el => el.estatus == "pendiente" );
        getTodosFilters(todoListArrNew);
    });
    
    $btnCompleted.addEventListener("click", e => {
        e.preventDefault();
        $btnCompleted.classList.add("selected");
        $btnAll.classList.remove("selected");
        $btnPending.classList.remove("selected");

        const todoListArr = JSON.parse(ls.getItem("todoList")) || [];

        todoListArrNew    = todoListArr.filter( el => el.estatus == "terminado" );
        getTodosFilters(todoListArrNew);
    });
    
    $btnCompletedDel.addEventListener("click", e => {
        e.preventDefault();
        const todoListArr = JSON.parse(ls.getItem("todoList")) || [];

        todoListArrNew    = todoListArr.filter( el => el.estatus != "terminado" );
        if( todoListArrNew.length > 0 ){
            ls.setItem("todoList", JSON.stringify(todoListArrNew))
        }else{
            ls.removeItem("todoList");
        }
        getTodos(); 
    });
    
}

function getTodosFilters( todoListArr = []){
    const $ul                 = d.querySelector("ul.todo-list"),
          $template           = d.getElementById("template-task").content,
          $fragment           = d.createDocumentFragment(),
          $toDoCount          = d.querySelector('.todo-count'),
          $btnCompletedDelete = d.getElementById('todos-completed-delete');

    let toDoCount          = 0,
        toDoCountCompleted = 0;

    $ul.innerHTML = null;

    todoListArr.forEach(element => {
        $template.querySelector("li").setAttribute("data-id", element.id); 
        $template.querySelector("label").textContent = element.title; 

        // Cuenta cuantos To do pendientes hay y Agrega estilos de completado o pendiente al To do.
        if( element.estatus == "pendiente" ){
            // Cuenta cuantos To do pendientes hay
            toDoCount += 1; 
            $template.querySelector("li").classList.remove('completed'); 
            $template.querySelector(".toggle").checked = false; 
        }else{
            $template.querySelector("li").classList.add('completed'); 
            $template.querySelector(".toggle").checked = true; 
            toDoCountCompleted += 1;
        }
        
        /* Se clona el nodo para que el template este disponible...
           ...para la segunda tarea. 
        */
        
        // El true indica que copia toda la estructura interna 
        let $clone = document.importNode($template, true); 


        // Se agrega el elemento al fragmento
        $fragment.appendChild($clone);
    });

    $ul.appendChild($fragment);
    $toDoCount.querySelector('strong').textContent = toDoCount;
    if( toDoCountCompleted <= 0 ) $btnCompletedDelete.style.display = "none";
    else                          $btnCompletedDelete.style.display = "block";
}
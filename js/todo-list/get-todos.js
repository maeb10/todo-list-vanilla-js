const ls = localStorage,
      d  = document;

export default function getTodos(){
    const todoListArr         = JSON.parse(ls.getItem("todoList")) || [],
          $ul                 = d.querySelector("ul.todo-list"),
          $template           = d.getElementById("template-task").content,
          $fragment           = d.createDocumentFragment(),
          $toDoCount          = d.querySelector('.todo-count'),
          $btnCompletedDelete = d.getElementById('todos-completed-delete'),
          $btnTodosAll        = d.getElementById('todos-all'),
          $btnTodosPending    = d.getElementById('todos-pending'),
          $btnTodosCompleted  = d.getElementById('todos-completed');
          
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
    $btnTodosAll.classList.add('selected');
    $btnTodosPending.classList.remove('selected');
    $btnTodosCompleted.classList.remove('selected');
}
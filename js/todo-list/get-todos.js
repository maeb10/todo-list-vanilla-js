const ls = localStorage,
      d  = document;

export default function getTodos(){
    const todoListArr = JSON.parse(ls.getItem("todoList")) || [],
          $ul       = d.querySelector("ul.todo-list"),
          $template = d.getElementById("template-task").content,
          $fragment = d.createDocumentFragment();
    
    $ul.innerHTML = null;
          
    todoListArr.forEach(element => {
        $template.querySelector("li").setAttribute("data-id", element.id); 
        $template.querySelector("label").textContent = element.title; 

        /* Se clona el nodo para que el template este disponible...
           ...para la segunda tarea. 
        */
        
        // El true indica que copia toda la estructura interna 
        let $clone = document.importNode($template, true); 
        $fragment.appendChild($clone);
    });
    $ul.appendChild($fragment);
}
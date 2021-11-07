const ls = localStorage;
export class Todo {

    constructor(title = "", estatus = "pendiente" ){
        this.id      = Todo.getIdLastInstance() + 1;
        this.title   = title;
        this.estatus = estatus;
    }

    static getIdLastInstance(){
        const todoListArr = JSON.parse(ls.getItem("todoList")) || [];
        
        return ( todoListArr.length > 0 ) 
                ? todoListArr[todoListArr.length-1].id
                :0;
    }
    
}
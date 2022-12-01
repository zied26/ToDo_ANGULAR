import { Component } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  constructor(public todo: TodoService) {
    //new Promise(() =>
     // setTimeout(() => {

     //appeler la fonction service
    //  }, 300)
   // )
  };
  public get count(): number {
    return (this.todo.tasks?.length > 0) ? this.todo.tasks?.filter(task => task.completed).length : 0;
  }

  public get completion(): number {
    return (this.todo.tasks?.length > 0) ? (this.count / this.todo.tasks?.length)*100 : 0;
  }

  trackByFunction(index: number, item: any): string {
    return item.id;
  }

}

import { Component } from '@angular/core';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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

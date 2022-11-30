import { Component } from '@angular/core';
import { Task } from './class/task.model';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public  count! : number;

  public  completion! : number;
  constructor(public todo: TodoService) {
    //new Promise(() =>
     // setTimeout(() => {
     

        this.count = this.todo.tasks.filter(task => task.completed).length;
        this.completion = (this.count / this.todo.tasks.length) * 100;
    //  }, 300)
   // )
  };


  ChangeCount(status : boolean): void {
    this.count = status ? this.count + 1 : this.count - 1;
    this.completion = (this.count / this.todo.tasks.length)*100;
  }

  trackByFunction(index: number, item: any): string {
    return item.id;
  }

}

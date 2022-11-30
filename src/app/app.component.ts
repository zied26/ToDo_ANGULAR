import { Component } from '@angular/core';
import { Task } from './class/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public  count! : number;
  public  tasks! : Task[];
  public  completion! : number;
  constructor() {
    new Promise(() =>
      setTimeout(() => {
        this.tasks = [
          new Task(0, "a", false, "e", Date()),
          new Task(1, "b", true, "f", Date()),
          new Task(2, "c", true, "g", Date())
        ];
        this.count = this.tasks.filter(task => task.completed).length;
        this.completion = (this.count / this.tasks.length) * 100;
      }, 300)
    )
  };


  ChangeCount(status : boolean): void {
    this.count = status ? this.count + 1 : this.count - 1;
    this.completion = (this.count / this.tasks.length)*100;
  }

  trackByFunction(index: number, item: any): string {
    return item.id;
  }
}

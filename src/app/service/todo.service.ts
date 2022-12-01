import { Injectable } from '@angular/core';
import { Task } from '../class/task.model';


const initalList : Task[] = [
  new Task( "a", false, "e", Date()),
  new Task( "b", true, "f", Date()),
  new Task( "c", true, "g", Date())
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public  tasks! : Task[];
  constructor() {
    this.updateList(initalList);
   }

   updateList(list: Task[]): any {
    new Promise<Task[]>(() => {
         setTimeout(() => {
          this.tasks = list;
        }, 1000);
  }
)}
  toggleComplete(index: number): void{
      this.tasks[index].completed = !this.tasks[index].completed;
  }
}

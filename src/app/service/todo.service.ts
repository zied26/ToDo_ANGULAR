import { Injectable } from '@angular/core';
import { Task } from '../class/task.model';


const initalList : Task[] = [
  new Task(0, "a", false, "e", Date()),
  new Task(1, "b", true, "f", Date()),
  new Task(2, "c", true, "g", Date())
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
}

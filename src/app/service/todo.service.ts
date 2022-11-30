import { Injectable } from '@angular/core';
import { Task } from '../class/task.model';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public  tasks! : Task[];
  constructor() {
    this.tasks = [ new Task(0, "a", false, "e", Date()),
    new Task(1, "b", true, "f", Date()),
    new Task(2, "c", true, "g", Date())
  ];

   }
}

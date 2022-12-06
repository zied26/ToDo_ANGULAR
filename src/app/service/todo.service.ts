
import { Injectable } from '@angular/core';
import { Task } from '../class/task.model';
import { BehaviorSubject, Observable } from 'rxjs';


const initalList : Task[] = [
  new Task( "a", false, "e", Date()),
  new Task( "b", true, "f", Date()),
  new Task( "c", true, "g", Date())
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private  tasks! : Task[];
  private _tasks = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this._tasks.asObservable();
  constructor() {
    this.updateList(initalList);
   }
   public getTasks() : Observable <Task[]>{
    return this.tasks$;

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
  public getTaskById(id: number): Task | null {
    // for (const task of this.tasks) {
    //   if (task.id == id)
    //     return task;
    // }
    // return null;
    return this.tasks.filter(task => task.id == id)[0];
  }
  public emit(tasks : Task[]) : void {
    this._tasks.next(Object.assign([],this.tasks));
  }
}


import { Injectable } from '@angular/core';
import { Task } from '../class/task.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


// const initalList: Task[] = [
//   new Task("a", false, "e", new Date()),
//   new Task("b", true, "f", new Date()),
//   new Task("c", true, "g", new Date())
// ];

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public tasks: Task[] = [];
  private _tasks = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this._tasks.asObservable();

  constructor(private http: HttpClient ) {
    // this.updateList(initalList);
  }

  public getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  // updateList(list: Task[]): any {
  //   // new Promise<Task[]>(() => {
  //   //   setTimeout(() => {
  //       this.tasks = list;
  //       this.emit(this.tasks);
  //       this.save();
  //   //   }, 1000);
  //   // })
  // }

  toggleComplete(index: number): void {
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

  public emit(tasks: Task[]): void {
    this._tasks.next(Object.assign([], tasks));
  }

  public addTask(task: Task): void {
    this.tasks.push(task);
    this.emit(this.tasks);
    this.save();
  }

  public save(): void {
    const url = "https://todo-list-bb97c-default-rtdb.europe-west1.firebasedatabase.app/";
    this.http.put(url + "/tasks.json", this.tasks).subscribe();
  }

  public load(): any {
    const url = "https://todo-list-bb97c-default-rtdb.europe-west1.firebasedatabase.app/";
    this.http.get( url + "/tasks.json")
  // .pipe(map((next : any) =>{
  //   return next;
  // }))
  .subscribe(
    response => {
      //console.log(response);
      this._tasks.next(Object.assign(this.tasks, response));
    }
  )
 }
}

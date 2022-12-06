import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import {  Observable, Subscription} from 'rxjs';
import { Task } from 'src/app/class/task.model';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent

 implements OnInit {
  public tasks : Task[] = [];
  private tasks$! : Observable <Task[]>;
  public subscribe! : Subscription;

  constructor(public todo: TodoService) {
    //new Promise(() =>
     // setTimeout(() => {

     //appeler la fonction service
    //  }, 300)
   // )
  };
  ngOnInit(): void {
    this.tasks$ = this.todo.getTasks();
    this.getTask();
    }
  public get count(): number {
    return (this.tasks?.length > 0) ? this.tasks?.filter(task => task.completed).length : 0;
  }

  public get completion(): number {
    return (this.tasks?.length > 0) ? (this.count / this.tasks?.length)*100 : 0;
  }

  trackByFunction(index: number, item: any): string {
    return item.id;
  }
 getTask() : void {
  this.subscribe = this.tasks$.subscribe(tasks =>{this.tasks = tasks})
 }
 ngOnDestroy() : void {
  this.subscribe.unsubscribe();
 }
}

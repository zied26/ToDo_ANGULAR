import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/class/task.model';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  public task: Task | null;
  constructor(private todo: TodoService,private route:ActivatedRoute, private router: Router){

    this.task=null
  }
  ngOnInit(): void { const routeId: string | null=this.route.snapshot.paramMap.get("id");
  let id: number = (routeId==null) ? -1 : +routeId;
  this.task = this.todo.getTaskById(id);}

  onSubmit(taskForm :NgForm): void{
   /* let title = taskForm.value.title;
    let description = taskForm.value.description;
    let completed = taskForm.value.completed;
    let date = Date.now().toString();
    let task =new Task(title, completed, description, date);
    this.todo.addTask(task);
    this.router.navigate(['todolist'])
    console.log(taskForm.value);*/

     // appelle la methode addTask de notre service todolist, en lui fournissant une nouvelle tache construite à partir des inputs de notre formulaire, puis nous redirige vers le composant todolist.

    this.todo.addTask(new Task(taskForm.value.name, (taskForm.value.completed == 0) ? false : true,taskForm.value.description , new Date()));
    this.router.navigate(['todolist']);



  }


}

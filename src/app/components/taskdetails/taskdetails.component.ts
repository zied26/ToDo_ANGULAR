import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/class/task.model';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.scss']
})

export class TaskDetailsComponent implements OnInit {

  public task: Task | null;

  constructor(private todo: TodoService, private route: ActivatedRoute) {
    this.task = null;
  }

  ngOnInit(): void {
    const routeId: string | null = this.route.snapshot.paramMap.get("id");
    let id: number = (routeId == null) ? -1 : +routeId;
    this.task = this.todo.getTaskById(id);
    console.log(this.task);
  }

}

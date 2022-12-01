import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/class/task.model';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() public task!: Task;

  constructor(public todo: TodoService) {}

  getComplete(): string {
    return this.task.completed ? "terminé" : "en cours";
  }

  getBadgeVariant(): string {
    return this.task.completed ? "d-inline float-right badge badge-success" : "d-inline float-right badge badge-warning";
  }

  getItemVariant(): string {
    return this.task.completed ? "ist-group-item list-group-item-success" : "list-group-item list-group-item-warning";
  }

  getButtonText(): string {
    return !this.task.completed ? "TERMINER" : "ANNULER";
  }

  toggleComplete(): void {
    this.todo.toggleComplete;
  }

  send(): void {
    this.toggleComplete();
  }

}

import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent  {
  @Input() public name : string|undefined;
  @Input() public complete : boolean|undefined;

  @Output() public change : EventEmitter<boolean> = new  EventEmitter<boolean>();



    constructor (){




  }
      getComplete() : string {
     return this.complete ? "terminé" : "en cours";

      }

      getBadgeVariant() : string {
      return this.complete ? "d-inline float-right badge badge-success" : "d-inline float-right badge badge-warning";

      }
      getItemVariant() : string {
      return this.complete ? "ist-group-item list-group-item-success" : "list-group-item list-group-item-warning";
      }

      getButtonText() : string{
        return !this.complete ? "TERMINER" : "ANNULER";
      }

      toggleComplete() : void {
         this.complete = !this.complete;
      }
      send() : any{
        this.toggleComplete();
        this.change.emit(this.complete);


      }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public  title : string = 'todo';
  public  count : number;

  public name1 : string;
  public name2 : string;
  public name3 : string;

  public complete1 : boolean;
  public complete2 : boolean;
  public complete3 : boolean;

  public id : number
  public title : string
  public completed : boolean
  public description : string

  constructor(){
    this.name1 = "jean";
    this.name2 = "jean-jean";
    this.name3 = "jean-pierre";

    this.complete1 = true;
    this.complete2 = false;
    this.complete3 = true;

    this.count = 2;

    this.id : number
    this.title : string
    this.completed : boolean
    this.description : string

  }

  ChangeCount(status : boolean){

    this.count = status ? this.count +1 : this.count -1;
  }
}

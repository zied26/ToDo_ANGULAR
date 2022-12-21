export class Task {

  

 constructor(


    public title : string,
    public completed : boolean,
    public description : string,
    public date : Date,
    public id : number,

  )
  {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.description = description;
    this.date = date;

  }
}

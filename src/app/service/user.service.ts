import { Injectable } from '@angular/core';
import { User } from '../class/models/user.model';
import { BehaviorSubject , Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// const initalUser : User[] = [
//   new User("jeanjean", "12345a", 25, "claude", "JEAN", "email@gmail.com", "lapin" , ["rapide"])
// ];

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  users! : User[];
  private _users: BehaviorSubject<User[]>;
  readonly users$: Observable<User[]>;
  public   url : string;

  constructor(private http: HttpClient) {
    this.users = [];
    this._users = new BehaviorSubject<User[]>([]);
    this.users$ = this._users.asObservable();
    // this.updateUsers(initalUser);
    this.url = "https://todo-list-bb97c-default-rtdb.europe-west1.firebasedatabase.app/";
  }

  public getUsers() : Observable <User[]>{
    return this.users$;
  }

  updateUsers(list: User[]): any {
  new Promise<User[]>(() => {
        // setTimeout(() => {
        this.users = list;
    //     this.emitUsers(this.users)
    //   }, 1000);
     }
  )}

  public emitUsers(users : User[]) : void {
    this._users.next(Object.assign([],users));
  }

  public addUser(user: User) : void{
    this.users.push(user);
    this.emitUsers(this.users);
  }

  public isUsernameAvailable(name: string) : boolean {
    return (this.users.filter(user => user.userName === name).length > 0) ? false : true;
  }

  public save(): void {
    const url = "https://todo-list-bb97c-default-rtdb.europe-west1.firebasedatabase.app/";
    this.http.put(url + "/users.json", this.users).subscribe();
  }

   public load(): any {

    this.http.get(this.url + "/users.json")
      .subscribe(
        response => {
          //console.log(response);
          this._users.next(Object.assign(this.users, response));
        }
      )
  }
}


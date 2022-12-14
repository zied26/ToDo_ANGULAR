import { Injectable } from '@angular/core';
import { User } from '../class/models/user.model';
import { BehaviorSubject , Observable } from 'rxjs';

const initalUser : User[] = [
  new User( "claude", "JEAN", "email@gmail.com", "lapin" , ["rapide"]) ];

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  users! : User[];
  private _users: BehaviorSubject<User[]>;
  readonly users$: Observable<User[]>;

  constructor() {
    this.users = [];
    this._users = new BehaviorSubject<User[]>([]);
    this.users$ = this._users.asObservable();
    this.updateUsers(initalUser);




   }
   public getUsers() : Observable <User[]>{
    return this.users$;

   }

   updateUsers(list: User[]): any {
    new Promise<User[]>(() => {
         setTimeout(() => {
          this.users = list;
          this.emitUsers(this.users)
        }, 1000);
  }
  ) }
  public emitUsers(users : User[]) : void {
    this._users.next(Object.assign([],users));
  }
  public addUser(user: User) : void{
    this.users.push(user);
    this.emitUsers(this.users);

  }
}


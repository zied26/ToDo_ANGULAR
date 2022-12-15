import { Component , OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/class/models/user.model';
import {  Observable, Subscription} from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent
  implements OnInit, OnDestroy {
public users: User[]=[];
private users$! : Observable<User[]>;
public subscribe! : Subscription;

constructor(public userList: UserService){

};

ngOnInit(): void {
  this.users$ = this.userList.getUsers();
  this.getUser();
  }
  trackByFunction(index: number, item: any): string {
    return item.id;
  }
  getUser() : void {
    this.subscribe = this.users$.subscribe(users =>{this.users = users})
   }
  ngOnDestroy() : void {
    this.subscribe.unsubscribe();
   }

}



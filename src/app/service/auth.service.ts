import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth : boolean;

  constructor() {
    this.isAuth = false;
  };

  public login(): void{
    setTimeout(() => {

   this.isAuth = true }, 2000);
  }
  public logout(): void{
    setTimeout(() => {

   this.isAuth = false }, 2000);
  }
}

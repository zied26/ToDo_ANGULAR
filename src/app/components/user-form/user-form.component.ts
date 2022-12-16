import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/models/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm : FormGroup;
  userName: FormControl;
  password: FormControl;
  age: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  team: FormControl;
  skills: FormArray;

  constructor(private fb: FormBuilder, private router: Router, private user: UserService){

    this.userName = this.fb.control('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]);
    this.password = this.fb.control('',[Validators.required, Validators.minLength(4), Validators.minLength(20)]);
    this.age = this.fb.control('',[Validators.required,Validators.min(8), Validators.max(110)]);
    this.firstName = this.fb.control('',[Validators.required, Validators.minLength(4)]);
    this.lastName = this.fb.control('',[Validators.required, Validators.minLength(4)]);
    this.email = this.fb.control('',[Validators.required, Validators.email]);
    this.team = this.fb.control('',[Validators.required]);
    this.skills = this.fb.array([this.fb.control('',[Validators.required])]);

    this.userForm = this.fb.group({
      userName: this.userName,
      password: this.password,
      age: this.age,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      team: this.team,
      skills: this.skills
    })
  }

  ngOnInit(): void {}

  getSkills(): any {
    return this.userForm.get('skills');
  }

  addSkill(): void {
    this.getSkills().push(this.fb.control('',[Validators.required]));
    console.log(Object.assign([], this.skills))
  }

  removeSkill(index: number): void {
    console.log(index)
    console.log(Object.assign([], this.skills))
    setTimeout(() => {
      this.skills.removeAt(index);
      console.log(Object.assign([], this.skills))
    }, 1000)
  }

  onSubmit(userForm : FormGroup){
    this.user.addUser(
      new User(
        this.userName?.value,
        this.password?.value,
        this.age?.value,
        this.firstName.value,
        this.lastName.value,
        this.email.value,
        this.team.value,
        this.getSkills().controls.map((skill: any) => skill.value)
      ));
    console.log(userForm.value);
    this.router.navigate(['userList']);
  }

  /*public get userName(): AbstractControl | null {
    return this.userForm?.get('userName');
  }*/

  trackByFunction(
     item: any): string {
    return item.id;
  }

}

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
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  team: FormControl;
  skills: FormArray;

  constructor(private fb: FormBuilder, private router: Router, private user: UserService){

    this.firstName = this.fb.control('',[Validators.required, Validators.minLength(4)]);
    this.lastName = this.fb.control('',[Validators.required, Validators.minLength(4)]);
    this.email = this.fb.control('',[Validators.required, Validators.email]);
    this.team = this.fb.control('',[Validators.required]);
    this.skills = this.fb.array([this.fb.control('',[Validators.required])]);

    this.userForm = this.fb.group({
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
        this.firstName.value,
        this.lastName.value,
        this.email.value,
        this.team.value,
        this.getSkills().controls.map((skill: any) => skill.value)
      ));
    console.log(userForm.value);
    this.router.navigate(['userList']);
  }

  trackByFunction(
     item: any): string {
    return item.id;
  }

}

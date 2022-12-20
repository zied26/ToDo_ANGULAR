import { Component, OnInit } from '@angular/core';
import {  AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/models/user.model';
import { UserService } from 'src/app/service/user.service';
import { debounceTime , distinctUntilChanged } from  'rxjs/operators';


@Component({
  selector: 'app-user-form' ,
  templateUrl: './user-form.component.html' ,
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm : FormGroup;

  userNameCtrl: FormControl;
  age: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  team: FormControl;
  skills: FormArray;

  passwordGroup: FormGroup;
  passwordCtrl: FormControl;
  confirmCtrl: FormControl;
  passwordStrength = 0;

  static passwordMatch(group : FormGroup){
    const password = group.get('passwordCtrl')?.value;
    const confirm = group.get('confirmCtrl')?.value;
    return password === confirm ? null : { matchingError : true};

  }

  birthdateCtrl : FormControl;

  static isOldEnough(control: FormControl){
    const birthDatePLus18 = new Date(control.value);
    birthDatePLus18.setFullYear(birthDatePLus18.getFullYear()+ 18);
    return birthDatePLus18 < new Date() ? null : {tooYoung : true};

  }

  constructor(private fb: FormBuilder, private router: Router, public user: UserService){

    this.userNameCtrl = this.fb.control('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]);
    this.age = this.fb.control('',[Validators.required,Validators.min(8), Validators.max(110)]);
    this.firstName = this.fb.control('',[Validators.required, Validators.minLength(4)]);
    this.lastName = this.fb.control('',[Validators.required, Validators.minLength(4)]);
    this.email = this.fb.control('',[Validators.required, Validators.email]);
    this.team = this.fb.control('',[Validators.required]);
    this.skills = this.fb.array([this.fb.control('',[Validators.required])]);

    this.passwordCtrl = fb.control('',[Validators.required, Validators.minLength(4), Validators.maxLength(13)] );
    this.confirmCtrl = fb.control('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)] );

    this.birthdateCtrl = fb.control('',[Validators.required,Validators.min(65), Validators.max(99) ,UserFormComponent.isOldEnough]);

    this.passwordGroup = fb.group({
      passwordCtrl: this.passwordCtrl,
      confirmCtrl: this.confirmCtrl
 },{
   validators: UserFormComponent
   .passwordMatch
 });

 this.passwordCtrl.valueChanges
 .pipe(debounceTime(400))
 .pipe(distinctUntilChanged())
 .subscribe(newValue=> this.passwordStrength = newValue.length);
 console.log(this.passwordStrength);
 console.log(this.passwordCtrl.valueChanges)

  this.userNameCtrl = fb.control('', [Validators.required, control => this.isUsernameAvailable(control)]);
    this.userForm = this.fb.group({
      userNameCtrl: this.userNameCtrl,
      age: this.age,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      team: this.team,
      skills: this.skills,
      passwordGroup: this.passwordGroup,
      birthdate: this.birthdateCtrl
    })
  }

  isUsernameAvailable(control : AbstractControl){
    const userName = control.value;
    return this.user.isUsernameAvailable(userName) ? null : {alreadyUsed : true};
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
    console.log(this.passwordCtrl.value)


    this.user.addUser(
      new User(
        this.userNameCtrl?.value,
        this.passwordCtrl?.value,
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

  /* 2éme méthode pour récupérer les valeurs

  public get userName(): AbstractControl | null {
    return this.userForm?.get('userName');
  }*/

  trackByFunction(
     item: any): string {
    return item.id;
  }

}

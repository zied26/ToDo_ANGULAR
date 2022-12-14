import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  skills: FormControl;





    constructor(private fb: FormBuilder, private router: Router, private user: UserService,private route:ActivatedRoute ){

      this.firstName = this.fb.control('',[Validators.required, Validators.minLength(4)]);
      this.lastName = this.fb.control('',[Validators.required, Validators.minLength(4)]);
      this.email = this.fb.control('',[Validators.required, Validators.email]);
      this.team = this.fb.control('',[Validators.required, Validators.required]);
      this.skills = this.fb.control('',[Validators.required, Validators.required]);


      this.userForm = this.fb.group({
        firstName: ['', [], []],
        lastName: ['', [], []],
        email: ['', [], []],
        team: ['', [], []],
        skills: ['', [], []],


      })
    }

ngOnInit() {

}

onSubmit(userForm : FormGroup){
  this.userForm.value.firstName.value , this.userForm.value.lastName.value , this.userForm.value.email.value ;
   this.user.addUser( new User(this.userForm.value.firstName.value , this.userForm.value.lastName.value , this.userForm.value.email.value, this.userForm.value.team.value, [this.userForm.value.skills.value] )) ;
  console.log(userForm.value);


}

}

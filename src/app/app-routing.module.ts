import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDetailsComponent } from './components/taskdetails/taskdetails.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [  {
  path: '',
  canActivate: [AuthGuardGuard],
  children: [
    {path: '', component: TodoListComponent, pathMatch: 'full'},
    {path: 'taskForm' , component: TaskFormComponent },
    {path: 'todolist', component: TodoListComponent, pathMatch: 'full'},
    {path: 'todolist/:id', component: TaskDetailsComponent},
    {path: 'userList', component: UserListComponent},
    {path: 'userForm', component: UserFormComponent},
  ]
},

  {path: 'login' , component: LoginComponent},

  {path: '404', component: NotFoundComponent},

  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, {enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenComponent } from './components/children/children.component';
import { ParentsComponent } from './components/parents/parents.component';
import { ParentsTasksComponent } from './components/parents/parents-tasks/parents-tasks.component';
import { ParentsRewardsComponent } from './components/parents/parents-rewards/parents-rewards.component';
import { LoginComponent } from './components/auth/login/login.component';

const routes: Routes = [
  {path: 'parents/:id', component: ParentsComponent},
  {path: 'children/:id', component: ChildrenComponent},
  {path: 'parents/tasks/:id', component: ParentsTasksComponent},
  {path: 'parents/rewards/:id', component: ParentsRewardsComponent},
  {path: 'login', component: LoginComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

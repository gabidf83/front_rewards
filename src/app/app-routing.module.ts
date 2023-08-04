import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenComponent } from './components/children/children.component';
import { ParentsComponent } from './components/parents/parents.component';
import { ParentsTasksComponent } from './components/parents/parents-tasks/parents-tasks.component';
import { ParentsRewardsComponent } from './components/parents/parents-rewards/parents-rewards.component';

const routes: Routes = [
  {path: 'parents', component: ParentsComponent},
  {path: 'children', component: ChildrenComponent},
  {path: 'parents/tasks/:id', component: ParentsTasksComponent},
  {path: 'parents/rewards/:id', component: ParentsRewardsComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

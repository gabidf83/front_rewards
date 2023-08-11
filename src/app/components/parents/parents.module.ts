import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ParentsComponent } from './parents.component';
import { ParentsChildrenComponent } from './parents-children/parents-children.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ParentsTasksComponent } from './parents-tasks/parents-tasks.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ParentsRewardsComponent } from './parents-rewards/parents-rewards.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ParentsComponent,
    ParentsChildrenComponent,
    ParentsTasksComponent,
    ParentsRewardsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ParentsModule { }

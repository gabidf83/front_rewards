import { ParentsService } from './services/parents.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChildrenComponent } from './components/children/children.component';
import { ParentsModule } from './components/parents/parents.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    ChildrenComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ParentsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ],
  providers: [
    ParentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

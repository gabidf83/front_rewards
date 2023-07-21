import { ParentsService } from './services/parents.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ParentsComponent } from './components/parents/parents.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ParentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

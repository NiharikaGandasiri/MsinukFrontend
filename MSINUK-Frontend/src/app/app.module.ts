import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { UniversityDetailsComponent } from './university-details/university-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AvatarModule } from 'ngx-avatars';
import { WishListComponent } from './wish-list/wish-list.component';
import { PartTimeJobsComponent } from './part-time-jobs/part-time-jobs.component';
import { ApartmentsComponent } from './apartments/apartments.component';
import { FeedbackComponent } from './feedback/feedback.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UniversityDetailsComponent,
    LoginComponent,
    WishListComponent,
    PartTimeJobsComponent,
    ApartmentsComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AvatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

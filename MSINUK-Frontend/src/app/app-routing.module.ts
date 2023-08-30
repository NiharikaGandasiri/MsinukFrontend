import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UniversityDetailsComponent } from './university-details/university-details.component';
import { LoginComponent } from './login/login.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { PartTimeJobsComponent } from './part-time-jobs/part-time-jobs.component';
import { ApartmentsComponent } from './apartments/apartments.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path: '', redirectTo: 'home',pathMatch:'full'},
  {path:'university/:id/:university', component:UniversityDetailsComponent},
  {path:'login', component:LoginComponent},
  {path:'wishlist', component:WishListComponent},
  {path:'partTime', component:PartTimeJobsComponent},
  {path:'apartments', component:ApartmentsComponent},
  {path:'feedback', component:FeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

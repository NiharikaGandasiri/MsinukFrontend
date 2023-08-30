import { Component } from '@angular/core';
import { University } from '../university';
import { UniversityService } from './university.service';
import { UniversityDetails } from '../university-details';
import { User } from '../user';
import { Subscription } from 'rxjs';
import { UserService } from '../login/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  universities: UniversityDetails[];
  wishlist: UniversityDetails[];
  university: University = new University();
  lastVisited: UniversityDetails = new UniversityDetails();
  isSearchresults: boolean = false;
  user:User;
  isLoggedIn:boolean = false;
  subscription: Subscription;

  departments:String[] = ['Accounting and Finance', 'Architecture','Business and Management','Computing','Design','Economics','Education','Engineering','English and Creative Writing','History','Law','Media','Music','Pyschology','Sciences','Computer Science','Data Science'];
  constructor(private service:UniversityService,private userService:UserService){ }

  ngOnInit():void{
    this.service.getUniversityList().subscribe(
      data=>{
        this.universities = data;
        this.getUser();
        this.university.departments="";
      });
  }
  ngSubmit():void{
      this.service.getUniversityByname(this.university).subscribe(
        data=>{
          this.universities=data;
          this.isSearchresults =true;
        });
  }
  getUser(){
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.user = user;
      if(user.firstName!=undefined){
        this.isLoggedIn=true;
        this.userProfile();
      }
    });
  }
  userProfile() {
    var temp = this.universities;
    const wishlist = new Array();
    for(const university in temp) {
      if(temp[university].id==this.user.lastVisited){
        this.lastVisited = temp[university];
      }
      if(this.user.wishlist.includes(temp[university].id)){
        wishlist.push(temp[university]);
      }
    }
    this.wishlist = wishlist;
  }
}

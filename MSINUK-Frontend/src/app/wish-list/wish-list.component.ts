import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../login/user.service';
import { User } from '../user';
import { UniversityService } from '../home/university.service';
import { UniversityDetails } from '../university-details';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {
  subscription: Subscription;
  user:User;
  universities: UniversityDetails[];
  isEmpty:boolean=true;
  constructor(private service:UniversityService,private userService:UserService){ }
  ngOnInit():void{
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.user = user;
      if(user.firstName!=undefined){
        this.getWishList();
      }
    });
  }
  getWishList() {
    this.service.getWishList(this.user.wishlist.toString()).subscribe(
      data=>{
      this.universities = data;
      this.isEmpty=false;
      console.log(this.universities);
      }
    );
  }
}

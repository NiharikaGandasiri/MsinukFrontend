import { Component } from '@angular/core';
import { UserService } from './login/user.service';
import { User } from './user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MSINUK-Frontend';
  user:User;
  subscription: Subscription;
  constructor(private service:UserService){}
  ngOnInit(){
    this.subscription = this.service.currentUser.subscribe(user => {
      this.user = user;
    });
  }
  profile(){
   let submenu= document.getElementById("subMenu");
   submenu?.classList.toggle("open-profile");
  }
}

import { Component } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  remember_me:boolean=false;
  userpass:string;
  username:string;
  user: User = new User();
  confirmPassword:string;
  loginResponse:any;
  isError:boolean =false;
  errorMessage:string;

  constructor(private service :UserService, private router:Router){}

  ngOnInit(){
    
  }
  LogIn(){
    if(this.username==undefined){
        this.isError=true;
        this.errorMessage = "please Enter UserName";
    }
    else if(this.userpass==undefined){
        this.isError=true;
        this.errorMessage = "please Enter Password";
    }
    else{
        this.service.checkUser(this.username,this.userpass).subscribe((data:any)=>
        {
          this.loginResponse = data;
          const user = data.user;
          if(this.loginResponse.status){
            this.service.changeUser(user);
            this.router.navigateByUrl("/");
          }
          else{
            this.isError=true;
            this.errorMessage = this.loginResponse.message;
          }

        });
    }
  }
  addUser(){
      if(this.checkUser()){
        this.service.addUser(this.user).subscribe((data:any)=>{
          this.loginResponse = data;
          if(this.loginResponse.status){
            this.router.navigateByUrl("/login");
          }
          else{
            this.isError=true;
            this.errorMessage = this.loginResponse.message;
          }
        });
      }
  }
  checkUser():boolean {
    if(this.user.firstName==undefined){
      this.isError=true;
      this.errorMessage = "Please Enter firstName";
      return false;
    }
    else if(this.user.lastName==undefined){
      this.isError=true;
      this.errorMessage = "Please Enter lastName";
      return false;
    }
    else if(this.user.userName==undefined){
      this.isError=true;
      this.errorMessage = "Please Enter UserName";
      return false;
    }
    else if(this.user.password==undefined){
      this.isError=true;
      this.errorMessage = "Please Enter password";
      return false;
    }
    else if(this.confirmPassword==undefined){
      this.isError=true;
      this.errorMessage = "Please Re-Enter password";
      return false;
    }
    else if(this.confirmPassword!=this.user.password){
      this.isError=true;
      this.errorMessage = "Password and confirm password does not match";
      return false;
    }
    else{
      this.isError=false;
      this.errorMessage = "";
      return true;
    }
  }
  signin(){
    var element = document.getElementById("signin");
    element!.classList.toggle("active");
    var element2 = document.getElementById("signup");
    element2!.classList.toggle("active");
  }
  signup(){
    var element = document.getElementById("signup");
    element!.classList.toggle("active");
    var element2 = document.getElementById("signin");
    element2!.classList.toggle("active");
  }
}

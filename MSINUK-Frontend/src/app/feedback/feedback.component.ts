import { Component } from '@angular/core';
import { User } from '../user';
import { Subscription } from 'rxjs';
import { UserService } from '../login/user.service';
import { Feedback } from '../feedback';
import { FeedbackService } from './feedback.service';
import { data } from 'jquery';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
rating:number;
recommendValue:number;
user:User;
subscription: Subscription;
message:string;
isFeedback:boolean=false;
isInit:boolean=false;
isError:boolean=false;
errorMessage:string;
feedback:Feedback=new Feedback();
constructor(private userService:UserService, private feedbackService:FeedbackService){ }

ngOnInit():void{
  this.getUser();
  this.isInit=true;
}

ratingChange(){
  this.feedback.rating=this.rating;
}

recommend(value:number,event:any){
  this.feedback.recommendValue=value;
  var divsToHide = Array.from(document.getElementsByClassName('recommend') as HTMLCollectionOf<HTMLElement>);

      for(var i = 0; i < divsToHide.length; i++){
         divsToHide[i].classList.remove("active");
      }
      event.target.classList.add("active");

}

onSubmit(){
 
  if(this.feedback.username==undefined){
    this.isError=true;
    this.errorMessage="Please login first to provide your feedback";
  }
  else if(isNaN(this.feedback.rating)){
    this.isError=true;
    this.errorMessage="Please provide your rating to submit feedback";
  }
  else if(this.feedback.recommendValue==undefined){
    this.isError=true;
    this.errorMessage="Please provide your recommendation value to submit feedback";
  }
  else{
    this.feedbackService.addFeedback(this.feedback).subscribe((data:any)=>{
    
      if(data.status==true){
        this.message = data.message;
        this.isFeedback=true;
        this.isInit=false;
  
      }
    });
  }  
}

getUser(){
  this.subscription = this.userService.currentUser.subscribe(user => {
    this.user = user;
    if(user.firstName!=undefined){
      this.feedback.username=this.user.userName;
    }
  });
}
}

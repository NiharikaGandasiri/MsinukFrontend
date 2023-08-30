import { ViewChild, AfterViewInit, Component, ElementRef } from '@angular/core';
import { ActivatedRoute,} from '@angular/router';
import { UniversityDetailsService } from './university-details.service';
import { UniversityDetails } from '../university-details';
import { User } from '../user';
import { Subscription } from 'rxjs';
import { UserService } from '../login/user.service';

@Component({
  selector: 'app-university-details',
  templateUrl: './university-details.component.html',
  styleUrls: ['./university-details.component.css']
})
export class UniversityDetailsComponent implements AfterViewInit {
    id: string;
    universityDetails: UniversityDetails;
    hasUniversity:boolean = false
    user:User;
    subscription: Subscription;
    courseObj:any;
    isUser:boolean=false;
    isBookmark:boolean=false;
    courseMap:Map<string,string[]> = new Map<string, string[]>();
    title = 'angular-gmap';
    @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    map: google.maps.Map;
    lat = 40.73061;
    lng = -73.935242;
    coordinates = new google.maps.LatLng(this.lat, this.lng);

    mapOptions: google.maps.MapOptions = {
     center: this.coordinates,
     zoom: 8
    };

    
    constructor(private route:ActivatedRoute,private service :UniversityDetailsService,private userService:UserService){}

    ngOnInit(): void{
      const id = this.route.snapshot.paramMap.get('id');
      this.id = id!=null?id:"";
        if(this.id!=null && this.id!=""){
            this.service.getUniversityById(this.id).subscribe(
              data=>{
                this.universityDetails = data;
                this.hasUniversity=true;
                this.courseMap = this.universityDetails.courses;
                this.courseObj = JSON.parse(this.universityDetails.courseMap);
                this.getUser();
              });
        }
    }
    getUser(){
      this.subscription = this.userService.currentUser.subscribe(user => {
        this.user = user;
        if(this.user.firstName!=undefined){
          this.isBookmark=this.user.wishlist.indexOf(this.universityDetails.id)>-1;
          this.isUser=!this.isBookmark;
          this.updateLastVisited();
        }  
      });
    }
    sendit(value:string){
      var tempMap=this.universityDetails.courses;
      var filteredMap = new Map<string, string[]>();
      for (const property in tempMap) {
        const result = tempMap[property].filter((s: string) => s.toLowerCase().includes(value.toLowerCase()));
        if(result.length>0){
          filteredMap.set(property,tempMap[property]);
        }
      }
      this.courseMap = filteredMap;
    } 
    addToWishlist(){
       if(this.user.wishlist.indexOf(this.universityDetails.id)<0) {
        this.user.wishlist.push(this.universityDetails.id);
          this.userService.updateUser(this.user).subscribe((data:any)=>{
            if(data.status){
              console.log(data);
              this.isBookmark=true;
              this.isUser=false;
              this.userService.changeUser(this.user);
            }
          });
       }
    }
    updateLastVisited(){
      if(this.user.lastVisited!=this.universityDetails.id){
          this.user.lastVisited=this.universityDetails.id;
          this.userService.updateUser(this.user).subscribe((data:any)=>{
            if(data.status){
              this.userService.changeUser(this.user);     
            }
          });
      }
      console.log(this.user);
    }
    removeFromWishlist(){
      const index = this.user.wishlist.indexOf(this.universityDetails.id);
      if (index > -1) { 
        this.user.wishlist.splice(index, 1);
        this.userService.updateUser(this.user).subscribe((data:any)=>{
          if(data.status){
            console.log(data);
            this.isBookmark=false;
            this.isUser=true;
            this.userService.changeUser(this.user);
          }
        });
      }
    }
    collapse(event:any){
      console.log(event.target.nextSibling);
      const isexpanded = event.target.nextSibling.style.display=="block";
      if(isexpanded){
        event.target.nextSibling.style.display = "none";
      }
      else{
        this.expand(event);
      }
      
    }
    expand(event:any){
      var divsToHide = Array.from(document.getElementsByClassName('course') as HTMLCollectionOf<HTMLElement>);
      for(var i = 0; i < divsToHide.length; i++){
         divsToHide[i].style.display = "none";
      }
      event.target.nextSibling.style.display = event.target.nextSibling.style.display=="none"?"block":"none";
    }

    ngAfterViewInit() {
      this.mapInitializer();
    }

    mapInitializer() {
      this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);
      const marker = new google.maps.Marker({
        position: this.coordinates,
        map: this.map,
      });
      marker.setMap(this.map);
    }
}


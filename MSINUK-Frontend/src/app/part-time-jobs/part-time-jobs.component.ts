import { Component } from '@angular/core';


@Component({
  selector: 'app-part-time-jobs',
  templateUrl: './part-time-jobs.component.html',
  styleUrls: ['./part-time-jobs.component.css']
})
export class PartTimeJobsComponent {
  portalUrl:string;
  isPortalOpen:boolean = false;
  portalUrls = {
    cvLibrary:'https://www.cv-library.co.uk/',
    simplyhired:'https://www.simplyhired.com/'
  }

  constructor(){}
  
  getPortal(name:string) {
    this.isPortalOpen=true;
    switch(name){
      case 'cvLibrary':{
        this.portalUrl=this.portalUrls.cvLibrary;
        break;
      }
      case 'simplyhired':{
        this.portalUrl=this.portalUrls.simplyhired;
        break;
      }
    }
    var ele = document.getElementById("portal");
    ele!=null?ele.setAttribute("src",this.portalUrl):console.log("element not exist");
  }
}

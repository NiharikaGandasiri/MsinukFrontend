import { Component } from '@angular/core';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent {
  portalUrl:string;
  isPortalOpen:boolean = false;
  portalUrls = {
    amber:'https://amberstudent.com/?utm_source=bing_ads&utm_campaign=branded_bing&utm_content=AmberStudent-All&keyword=amberstudent&msclkid=48da44f785561242d4d220327a7cfd33',
    sulets:'https://www.sulets.com/',
    uniteStudents:'https://www.unitestudents.com/'
  }

  getPortal(name:string) {
    this.isPortalOpen=true;
    switch(name){
      case 'amber':{
        this.portalUrl=this.portalUrls.amber;
        break;
      }
      case 'sulets':{
        this.portalUrl=this.portalUrls.sulets;
        break;
      }
      case 'uniteStudents':{
        this.portalUrl=this.portalUrls.uniteStudents;
        break;
      }
    }
    var ele = document.getElementById("portal");
    ele!=null?ele.setAttribute("src",this.portalUrl):console.log("element not exist");
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { University } from '../university';
import { UniversityDetails } from '../university-details';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private baseUrl = "http://localhost:8080/api/v1/Universities";
  private getuniversities = "http://localhost:8080/api/v1/getUniversities";
  private wishListUrl = "http://localhost:8080/api/v1/getWishList";
  constructor(private httpClient: HttpClient) { }
  getUniversityList(): Observable<UniversityDetails[]>{
    return this.httpClient.get<UniversityDetails[]>(this.baseUrl);
    
  }
  getUniversityByname(university:University): Observable<UniversityDetails[]>{
    let params = new HttpParams();
    params = params.append('uname', university.universityName);
    params = params.append('cname', university.courses);
    params = params.append('department', university.departments);
    return this.httpClient.get<UniversityDetails[]>(this.getuniversities,{params:params});
  }
  getWishList(wishlist:string): Observable<UniversityDetails[]>{
    let params = new HttpParams();
    params = params.append('ids', wishlist);
    return this.httpClient.get<UniversityDetails[]>(this.wishListUrl,{params:params});
  }
}

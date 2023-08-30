import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UniversityDetails } from '../university-details';

@Injectable({
  providedIn: 'root'
})
export class UniversityDetailsService {

  private baseUrl = "http://localhost:8080/api/v1/getUniversity";
  constructor(private httpClient:HttpClient) { }

  getUniversityById(universityId:string): Observable<UniversityDetails>{
    let params = new HttpParams();
    params = params.append('id', universityId);;
    return this.httpClient.get<UniversityDetails>(this.baseUrl,{params:params});
    
  }
}

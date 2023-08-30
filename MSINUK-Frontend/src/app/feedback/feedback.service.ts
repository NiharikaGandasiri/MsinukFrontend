import { Injectable } from '@angular/core';
import { Feedback } from '../feedback';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = "http://localhost:8080/api/v1/addFeedback";
  constructor(private httpClient:HttpClient) { }

  addFeedback(feedback: Feedback) : Observable<object>{
    let params = new HttpParams();
    params = params.append('feedback', JSON.stringify(feedback));
    return this.httpClient.get(this.baseUrl,{params:params});
  }
}

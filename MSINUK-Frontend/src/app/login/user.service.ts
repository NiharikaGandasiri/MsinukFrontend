import { Injectable } from '@angular/core';
import { User } from '../user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = new User();
  private userObject = new BehaviorSubject<User>(this.user);
  currentUser = this.userObject.asObservable();
  private baseUrl = "http://localhost:8080/api/v1/addUser";
  private getUrl = "http://localhost:8080/api/v1/user";
  private updateUrl = "http://localhost:8080/api/v1/updateUser";
  constructor(private httpClient:HttpClient) { }
  addUser(user: User) : Observable<object>{
    let params = new HttpParams();
    params = params.append('user', JSON.stringify(user));
   return this.httpClient.get(this.baseUrl,{params:params});
  }
  checkUser(username: string, userpass: string):Observable<object> {
    let params = new HttpParams();
    params = params.append('username', username);
    params = params.append('password', userpass);
    return this.httpClient.get<object>(this.getUrl,{params:params});
  }
  updateUser(user: User) : Observable<object>{
    let params = new HttpParams();
    params = params.append('user', JSON.stringify(user));
   return this.httpClient.get(this.updateUrl,{params:params});
  }
  changeUser(user: User) {
    this.userObject.next(user);
  }

}

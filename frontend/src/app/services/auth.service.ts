import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse, User, UserSession } from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'http://localhost:5000/api/';

  userSubject = new BehaviorSubject<UserSession | null>(null);

  constructor(private http: HttpClient) { }

  login(user: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.url +'user/login', user);
  }

  signup(user: SignupRequest): Observable<SignupResponse>{
    return this.http.post<SignupResponse>(this.url +'user/signup', user);
  }

  logout() {
    localStorage.removeItem('user');
  }

  setSession(userSession: UserSession) {
    localStorage.setItem('user', JSON.stringify(userSession));
    this.userSubject.next(userSession);
  }

  getSession() {
    if(this.userSubject.value == null) {
      var userSessionString = localStorage.getItem('user');

      if (userSessionString !== null) {
        const userSession = JSON.parse(userSessionString) as UserSession;
        this.userSubject.next(userSession);
    }

  }
}

    getUserName() {
      if(this.userSubject.value != null) {
        return this.userSubject.value.name;
      }
      return null;
    }

    getUserId() {
      if(this.userSubject.value != null) {
        return this.userSubject.value._id;
      }
      return null;
    }

  isAuthenticated(): boolean {
    const jwtToken = localStorage.getItem('user');

    return !!jwtToken; 
  }

  checkSessionIsAvailable() {
      var userSessionString = localStorage.getItem('user');
      if (userSessionString !== null) {
        return true;
      }
    return false;
  } 
}

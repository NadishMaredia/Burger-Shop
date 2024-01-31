import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  login(user: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.url +'user/login', user);
  }

  setSession(token: any) {
    const jwtToken = token;

    localStorage.setItem('jwtToken', jwtToken);
  }

  isAuthenticated(): boolean {
    const jwtToken = localStorage.getItem('jwtToken');

    return !!jwtToken; 
  }
}

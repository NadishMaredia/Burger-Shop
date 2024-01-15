import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  getAllCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(this.url +'category');
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  getAllProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.url +'product');
  }
}

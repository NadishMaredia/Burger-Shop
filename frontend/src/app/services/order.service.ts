import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  placedOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url +'order', order);
  }
}

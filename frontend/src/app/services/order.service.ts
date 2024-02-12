import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  placedOrder(order: Order) {
    return this.http.post(this.url +'order', order);
  }
}

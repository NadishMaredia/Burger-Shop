import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  formatCurrency(currency: Number) {
    return "$" + currency;
  }
}

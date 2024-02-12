import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/Cart';
import { CartService } from '../services/cart.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cart: Cart[] = [];
  total: number = 0;
  constructor(private cartService: CartService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.getCart();
    this.calculateTotal();
  }

  getCart() {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(item: Cart){
    this.cartService.removeFromCart(item);
    this.getCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cart.reduce((acc, product) => {
      return acc + (product.quantity * product.price);
    }, 0);
  }

  formatCurrency(amount: Number) {
    return this.utilService.formatCurrency(amount);
  }
}

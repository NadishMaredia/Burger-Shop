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
  taxes: number = 0;
  totalAmount: number = 0;
  quantityOptions = Array.from({ length: 20 }, (_, i) => i + 1);

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

    this.calculateTaxes();
    this.calculateTotalAmount();
  }

  calculateTaxes() {
    this.taxes = this.total * (13.0 / 100);
  }

  calculateTotalAmount() {
    this.totalAmount = this.total + this.taxes;
  }

  updateQuantity(index: number): void {
    this.cartService.saveCart();
    this.getCart();
    this.calculateTotal();
  }

  formatCurrency(amount: Number) {
    return this.utilService.formatCurrency(amount);
  }
}

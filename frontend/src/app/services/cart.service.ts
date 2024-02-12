import { Injectable } from '@angular/core';
import { Cart } from '../models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart[] = [];

  constructor() {
    // Load cart data from session storage if available
    const cartData = sessionStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  getCart(): Cart[] {
    return this.cart;
  }

  addToCart(product: Cart): void {
    const existingProduct = this.cart.find(p => p.id === product.id);

    if (existingProduct) {
      // Update quantity if the product is already in the cart
      existingProduct.quantity += 1;
    } else {
      // Add the product to the cart with quantity 1
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCart();
  }

  removeFromCart(product: Cart): void {
    const index = this.cart.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.saveCart();
    }
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }

  private saveCart(): void {
    // Save the updated cart to session storage
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
}

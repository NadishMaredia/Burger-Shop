import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/Cart';
import { CartService } from '../services/cart.service';
import { UtilService } from '../services/util.service';
import { Order } from '../models/Order';
import { AuthService } from '../services/auth.service';
import { OrderConfirmationModalComponent } from '../order-confirmation-modal/order-confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart: Cart[] = [];
  total: number = 0;
  taxes: number = 0;
  totalAmount: number = 0;
  quantityOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private utilService: UtilService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCart();
    this.calculateTotal();
  }

  getCart() {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(item: Cart) {
    this.cartService.removeFromCart(item);
    this.getCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cart.reduce((acc, product) => {
      return acc + product.quantity * product.price;
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

  placeOrder() {
    var order: Order = {
      cart: this.cart,
      createdDate: new Date().toUTCString(),
      paymentStatus: 'Not',
      status: 'Placed',
      userId: this.authService.getUserId(),
      totalAmount: this.totalAmount.toFixed(2),
    };
    this.openDialog(order);
    this.router.navigateByUrl('/order-confirm') ;
  }

  openDialog(order: Order) {
    const dialogRef = this.dialog.open(OrderConfirmationModalComponent, {
      width: '400px', // Adjust the width as needed
      data: { order }, // Pass data to the modal if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions after the modal is closed, if needed
      console.log('Modal closed with result:', result);
    });
  }
}

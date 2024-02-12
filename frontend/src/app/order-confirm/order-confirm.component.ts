import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {

  selectedIndex: number = 0; // Default index

  constructor() { }

  ngOnInit(): void {
    this.selectedIndex = this.mapStatusToIndex('Order Placed');
  }

  private mapStatusToIndex(status: string): number {
    switch (status) {
      case 'Order Placed':
        return 0;
      case 'Preparing':
        return 1;
      case 'Quality Check':
        return 2;
      case 'Delivery':
        return 3;
      case 'Completed':
        return 4;
      default:
        return 0; // Default to the first step if the status is not recognized
    }
  }

}

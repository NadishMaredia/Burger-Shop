import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-confirmation-modal',
  templateUrl: './order-confirmation-modal.component.html',
  styleUrls: ['./order-confirmation-modal.component.css']
})
export class OrderConfirmationModalComponent {

  cardName: string = '';
  cardNumber: string = '';
  cvv: string = '';

  constructor(public dialogRef: MatDialogRef<OrderConfirmationModalComponent>) {}

  close() {
    this.dialogRef.close();
  }

  confirmOrder() {
    if (this.cardName.trim() === '' || this.cardNumber.trim() === '' || this.cvv.trim() === '') {
    // Fields are empty, do not close the modal
    alert('Please fill in all fields');
  } else {
    // Fields are not empty, close the modal
    this.dialogRef.close({
      cardName: this.cardName,
      cardNumber: this.cardNumber,
      cvv: this.cvv
    });
  }
  }
}

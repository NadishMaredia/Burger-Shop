import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snotifyService: SnotifyService) {}

  showSuccess(message: string): void {
    this.snotifyService.success(message);
  }

  showError(message: string): void {
    this.snotifyService.error(message);
  }
}

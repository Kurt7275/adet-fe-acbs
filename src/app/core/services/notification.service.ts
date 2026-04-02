import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification | null>(null);

  success(message: string, duration = 3000): void {
    this.show({ message, type: 'success', duration });
  }

  error(message: string, duration = 5000): void {
    this.show({ message, type: 'error', duration });
  }

  warning(message: string, duration = 4000): void {
    this.show({ message, type: 'warning', duration });
  }

  info(message: string, duration = 3000): void {
    this.show({ message, type: 'info', duration });
  }

  private show(notification: Notification): void {
    this.notifications$.next(notification);
    if (notification.duration) {
      setTimeout(() => this.notifications$.next(null), notification.duration);
    }
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Booking History</h1>
      <p class="text-gray-600">Your past consultations will appear here...</p>
    </div>
  `,
})
export class BookingHistoryComponent {}

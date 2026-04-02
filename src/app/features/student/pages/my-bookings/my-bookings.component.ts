import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">My Bookings</h1>
      <p class="text-gray-600">Your bookings will appear here...</p>
    </div>
  `,
})
export class MyBookingsComponent {}

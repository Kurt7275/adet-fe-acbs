import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">
        Welcome, {{ user?.firstName }}!
      </h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-700 mb-2">Find Teachers</h2>
          <p class="text-gray-600 mb-4">Browse available teachers</p>
          <a routerLink="/dashboard/teachers" class="text-blue-600 hover:text-blue-800">
            View Teachers →
          </a>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-700 mb-2">My Bookings</h2>
          <p class="text-gray-600 mb-4">View upcoming consultations</p>
          <a routerLink="/dashboard/bookings" class="text-blue-600 hover:text-blue-800">
            My Bookings →
          </a>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-700 mb-2">History</h2>
          <p class="text-gray-600 mb-4">Past consultations</p>
          <a routerLink="/dashboard/history" class="text-blue-600 hover:text-blue-800">
            View History →
          </a>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  user: any;
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }
}
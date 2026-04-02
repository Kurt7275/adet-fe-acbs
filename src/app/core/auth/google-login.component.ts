import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center text-gray-900 mb-2">
          ACBS
        </h1>
        <p class="text-center text-gray-600 mb-8">
          Academic Consultation Booking System
        </p>
        
        <div class="bg-blue-600 text-white text-center py-3 rounded-lg mb-6 cursor-pointer hover:bg-blue-700"
          (click)="mockLogin()">
          Sign in with Google
        </div>

        <p class="text-xs text-center text-gray-500 mt-6">
          Login with your &#64;liceo.edu.ph email
        </p>
      </div>
    </div>
  `,
})
export class GoogleLoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {}

  mockLogin(): void {
    console.log('Google login button clicked');
    // Will implement Google OAuth later
  }
}

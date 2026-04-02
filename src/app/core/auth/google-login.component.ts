import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { NotificationService } from '../services/notification.service';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 relative overflow-hidden">
      <!-- Animated background blobs -->
      <div class="absolute top-0 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute top-0 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <!-- Main card -->
      <div class="relative z-10 w-full max-w-md px-4">
        <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12 backdrop-blur-lg bg-opacity-95">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3 mb-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5M10.5 1.5v8m0 0l-3-3m3 3l3-3M18.5 1.5v6m0 0h-6m6 0l-2-2m2 2l2-2"/>
              </svg>
            </div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">ACBS</h1>
            <p class="text-gray-600 text-sm font-medium">Academic Consultation Booking System</p>
          </div>

          <!-- Features list -->
          <div class="mb-8 space-y-3">
            <div class="flex items-center text-sm text-gray-700">
              <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <span>Book consultations with teachers</span>
            </div>
            <div class="flex items-center text-sm text-gray-700">
              <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <span>Manage your schedule</span>
            </div>
            <div class="flex items-center text-sm text-gray-700">
              <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <span>Real-time notifications</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="relative mb-8">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Sign in to get started</span>
            </div>
          </div>

          <!-- Google Login Button -->
          <div class="mb-6">
            <button
              (click)="loginWithGoogle()"
              [disabled]="isLoading"
              class="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              [class.bg-gray-50]="isLoading">
              <svg *ngIf="!isLoading" class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span *ngIf="isLoading" class="inline-block animate-spin">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </span>
              <span>{{ isLoading ? 'Signing in...' : 'Continue with Google' }}</span>
            </button>
          </div>

          <!-- Error message -->
          <div *ngIf="errorMessage" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-700">{{ errorMessage }}</p>
          </div>

          <!-- Footer -->
          <p class="text-center text-xs text-gray-500 mb-4">
            Login with your <span class="font-semibold text-gray-700">&#64;liceo.edu.ph</span> email address
          </p>

          <div class="border-t border-gray-200 pt-4">
            <p class="text-center text-xs text-gray-500">
              Liceo de Cagayan University<br>
              © 2026 All rights reserved
            </p>
          </div>
        </div>

        <!-- Info card below -->
        <div class="mt-6 text-center text-white text-sm">
          <p>For support, contact: <span class="font-semibold">support&#64;liceo.edu.ph</span></p>
        </div>
      </div>

      <style>
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20x) scale(0.9); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      </style>
    </div>
  `,
})
export class GoogleLoginComponent implements OnInit {
  isLoading = false;
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  ngOnInit(): void {
    this.loadGoogleScript();
  }

  private loadGoogleScript(): void {
    // Load Google Sign-In library
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  loginWithGoogle(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // In production, this will use Google OAuth
    // For now, we'll show a placeholder
    setTimeout(() => {
      this.isLoading = false;
      this.notification.error('Google OAuth setup required. Configure in backend first.');
    }, 1500);
  }
}

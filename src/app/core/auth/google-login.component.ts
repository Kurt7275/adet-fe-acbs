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
        
        <div id="g_id_onload"
          data-client_id="{{ googleClientId }}"
          data-callback="handleCredentialResponse"
          class="flex justify-center mb-6">
        </div>
        <div id="g_id_signin" data-type="standard" data-size="large" data-theme="outline"></div>

        <p class="text-xs text-center text-gray-500 mt-6">
          Login with your @liceo.edu.ph email
        </p>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .g_id_signin {
        display: flex;
        justify-content: center;
      }
    }
  `]
})
export class GoogleLoginComponent implements OnInit {
  googleClientId = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadGoogleScript();
  }

  private loadGoogleScript(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: this.googleClientId,
        callback: (response: any) => this.handleLogin(response),
      });
      window.google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        { theme: 'outline', size: 'large' }
      );
    };
  }

  private handleLogin(response: any): void {
    if (response.credential) {
      this.authService.googleLogin(response.credential).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
    }
  }
}
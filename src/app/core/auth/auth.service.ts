import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  googleLogin(idToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/google`, { idToken })
      .pipe(
        tap(response => {
          this.setAuthToken(response.accessToken, response.expiresIn);
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
          localStorage.setItem('user', JSON.stringify(response.user));
        }),
        shareReplay()
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    return this.currentUserSubject.value?.role === role;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(): boolean {
    const expiry = localStorage.getItem('tokenExpiry');
    if (!expiry) return true;
    return Date.now() > parseInt(expiry);
  }

  private setAuthToken(token: string, expiresIn: number): void {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiry', (Date.now() + expiresIn * 1000).toString());
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token && !this.isTokenExpired()) {
      this.currentUserSubject.next(JSON.parse(user));
      this.isAuthenticatedSubject.next(true);
    } else {
      this.logout();
    }
  }
}
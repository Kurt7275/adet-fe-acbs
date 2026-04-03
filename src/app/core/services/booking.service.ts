import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Booking {
  id: string;
  studentId: string;
  teacherId: string;
  consultationDate: string;
  reason: string;
  specialization: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  student?: any;
  teacher?: any;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  createBooking(data: any): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, data);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  approveBooking(id: string): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectBooking(id: string): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/${id}/reject`, {});
  }

  cancelBooking(id: string): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/${id}/cancel`, {});
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Teacher {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  teacher?: {
    specialization: string;
    bio?: string;
    availability?: any[];
  };
}

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private apiUrl = `${environment.apiUrl}/teachers`;

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  getTeacherById(id: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  updateProfile(data: any): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/profile`, data);
  }
}
import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'teachers',
    loadComponent: () =>
      import('./pages/find-teacher/find-teacher.component').then((m) => m.FindTeacherComponent),
  },
  {
    path: 'bookings',
    loadComponent: () =>
      import('./pages/my-bookings/my-bookings.component').then((m) => m.MyBookingsComponent),
  },    
  {
    path: 'history',
    loadComponent: () =>
      import('./pages/booking-history/booking-history.component').then((m) => m.BookingHistoryComponent),
  },
];
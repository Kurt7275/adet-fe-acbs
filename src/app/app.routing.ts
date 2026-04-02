import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/google-login.component').then((m) => m.GoogleLoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/student/student.routes').then((m) => m.STUDENT_ROUTES),
  },
  {
    path: 'teacher',
    canActivate: [authGuard, roleGuard(['TEACHER'])],
    loadChildren: () =>
      import('./features/teacher/teacher.routes').then((m) => m.TEACHER_ROUTES),
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard(['ADMIN'])],
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
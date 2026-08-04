import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'tasks', loadComponent: () => import('./task-board/task-board').then((m) => m.TaskBoard) },
  { path: 'users', loadComponent: () => import('./users/users').then((m) => m.Users) },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: '**', redirectTo: 'tasks' },
];

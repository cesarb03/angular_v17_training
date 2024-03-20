import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home/home.page')
  },
  {
    path: 'bookings/:slug',
    loadComponent: () => import('./views/bookings/bookings.page')
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./views/auth/login.component')
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./views/auth/register.page')
  }
]

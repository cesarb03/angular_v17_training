import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home.page')
  },
  {
    path: 'bookings/:slug',
    loadComponent: () => import('./bookings/bookings.component')
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

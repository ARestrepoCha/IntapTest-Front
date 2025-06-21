import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  // Rutas públicas
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-module').then((m) => m.AuthModule)
  },

  // Rutas protegidas con layout
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard').then(m => m.Dashboard)
      }
    ]
  },
  { path: '**', redirectTo: 'auth/login' }

  // Puedes agregar ruta comodín si quieres:
  // { path: '**', component: NotFoundComponent }
];

import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./features/charts/charts.module').then(m => m.ChartsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./features/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./features/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'components',
        loadChildren: () => import('./features/components/components.module').then(m => m.ComponentsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

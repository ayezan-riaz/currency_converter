import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'currency',
    loadChildren: () => import('./currency/currency.module').then(m => m.CurrencyModule)
  },
  {
    path: '',
    redirectTo: '/currency/converter',
    pathMatch: 'full'
  }
];

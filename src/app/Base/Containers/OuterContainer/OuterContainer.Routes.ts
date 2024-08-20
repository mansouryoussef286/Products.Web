import { Routes } from '@angular/router';
import { OuterContainer } from './OuterContainer';

export const OuterContainerRoutes: Routes = [
  {
    path: '',
    component: OuterContainer,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('@App/Features/Account/Login/Login').then(
            (m) => m.LoginComponent
          ),
      },
    ],
  },
];

import { Routes } from '@angular/router';
import { InnerContainer } from './InnerContainer';
import { AuthGuard } from '@App/Common/Guards/Auth.Guard';
export const InnerContainerRoutes: Routes = [
  {
    path: '',
    component: InnerContainer,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('@App/Features/ProductList/ProductsList').then(
            (c) => c.ProductsListComponent
          ),
      },
    ],
  },
];

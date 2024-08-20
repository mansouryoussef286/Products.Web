import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('@App/Base/Containers/InnerContainer/InnerContainer.Routes').then(
        (c) => c.InnerContainerRoutes
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('@App/Base/Containers/OuterContainer/OuterContainer.Routes').then(
        (c) => c.OuterContainerRoutes
      ),
  },
];

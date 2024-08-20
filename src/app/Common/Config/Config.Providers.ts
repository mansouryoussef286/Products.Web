import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '../../Base/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AppConfig } from './AppConfig';

export const appConfigProviders: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfig: AppConfig) => () => appConfig.LoadAppConfig(),
      multi: true,
      deps: [AppConfig],
    },
  ],
};

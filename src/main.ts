import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/Base/app.component';
import { appConfigProviders } from '@App/Common/Config/Config.Providers';

bootstrapApplication(AppComponent, appConfigProviders).catch((err) =>
  console.error(err)
);

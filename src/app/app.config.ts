import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp } from '@angular/fire/app';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment))
    ])
  ]
};

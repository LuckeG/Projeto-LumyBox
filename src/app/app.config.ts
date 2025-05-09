import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';  
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics'; 
import { importProvidersFrom } from '@angular/core';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { firebaseConfig} from './firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes), 
  importProvidersFrom(provideFirebaseApp (() => initializeApp(firebaseConfig))),
  importProvidersFrom(provideAnalytics(() => getAnalytics ())),
  importProvidersFrom(provideAuth(() => getAuth()))
]
};

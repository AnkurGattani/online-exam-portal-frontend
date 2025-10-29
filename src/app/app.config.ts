
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideHttpClient, withFetch } from '@angular/common/http'; // ✅ 1. IMPORT HTTP CLIENT

export const appConfig: ApplicationConfig = {
  providers: [
    // --- KEEP ALL YOUR ORIGINAL PROVIDERS ---
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // --- ADD THIS LINE ---
    provideHttpClient(withFetch()) // ✅ 2. ADD HTTP CLIENT PROVIDER HERE
  ]
};

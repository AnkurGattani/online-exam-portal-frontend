import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; // Your root component
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { Interceptor } from './app/services/interceptor/interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([Interceptor])) //  Register interceptor here
  ]
}).catch(err => console.error(err));
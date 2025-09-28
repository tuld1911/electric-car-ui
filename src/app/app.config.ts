// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import {
  provideHttpClient,
  withInterceptors,
  withXsrfConfiguration
} from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { withCredentialsInterceptor } from './with-credentials.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Router ở đây luôn
    provideRouter(routes),

    // HttpClient: gửi cookie + XSRF
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      }),
      withInterceptors([withCredentialsInterceptor])
    ),
  ]
};

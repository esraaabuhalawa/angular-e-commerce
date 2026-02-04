
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations'
import { headingInterceptor } from './core/interceptors/heading-interceptor';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TransferState } from '@angular/core';
import { translateLoaderFactory } from './i18n/translation-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([headingInterceptor])),
    provideAnimations(),
    importProvidersFrom(CookieService,
      TranslateModule.forRoot({
        fallbackLang: 'en', // ✅ Use fallbackLang instead of defaultLanguage
        loader: {
          provide: TranslateLoader,
          useFactory: translateLoaderFactory,
          deps: [HttpClient, TransferState]
        }
      }),
      ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      closeButton: true,
      progressBar: true,
    })),
  ]
};

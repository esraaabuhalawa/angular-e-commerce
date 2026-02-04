// src/app/i18n/translation-loader.ts
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TransferState, makeStateKey } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export class TranslateUniversalLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    private prefix: string = '/assets/i18n/',
    private suffix: string = '.json'
  ) {}

  getTranslation(lang: string): Observable<any> {
    const key = makeStateKey<any>(`translation-${lang}`);
    const storedTranslations = this.transferState.get(key, null);

    if (storedTranslations) {
      // Use cached translations from server
      return of(storedTranslations);
    }

    return this.http.get(`${this.prefix}${lang}${this.suffix}`).pipe(
      tap((translations) => {
        // Cache translations for client
        this.transferState.set(key, translations);
      })
    );
  }
}

export function translateLoaderFactory(
  http: HttpClient,
  transferState: TransferState
) {
  return new TranslateUniversalLoader(http, transferState);
}

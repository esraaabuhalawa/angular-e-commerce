// src/app/services/language.service.ts
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private platformId = inject(PLATFORM_ID);
  private translate = inject(TranslateService);

  private readonly STORAGE_KEY = 'selectedLanguage';
  private readonly supportedLanguages = ['en', 'ar'];

  constructor() {
    this.translate.addLangs(this.supportedLanguages);
    this.initLanguage();
  }

  private initLanguage(): void {
    let selectedLang = 'en';

    // ✅ Always check platform before using browser APIs
    if (isPlatformBrowser(this.platformId)) {
      try {
        selectedLang =
          localStorage.getItem(this.STORAGE_KEY) ||
          this.getBrowserLanguage() ||
          'en';

        this.updateDirection(selectedLang);
      } catch (error) {
        console.error('Error initializing language:', error);
      }
    }

    this.translate.use(selectedLang);
  }

  setLanguage(lang: string): void {
    if (!this.supportedLanguages.includes(lang)) {
      console.warn(`Language ${lang} not supported`);
      return;
    }

    this.translate.use(lang);

    // ✅ Only access localStorage in browser
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.STORAGE_KEY, lang);
        this.updateDirection(lang);
      } catch (error) {
        console.error('Error setting language:', error);
      }
    }
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }

  private updateDirection(lang: string): void {
    // ✅ Only access document in browser
    if (isPlatformBrowser(this.platformId)) {
      try {
        const dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;
      } catch (error) {
        console.error('Error updating direction:', error);
      }
    }
  }

  private getBrowserLanguage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const browserLang = navigator.language.split('-')[0];
        return this.supportedLanguages.includes(browserLang) ? browserLang : null;
      } catch (error) {
        console.error('Error getting browser language:', error);
        return null;
      }
    }
    return null;
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }
}

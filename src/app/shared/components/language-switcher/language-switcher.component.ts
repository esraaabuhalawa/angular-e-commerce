// src/app/components/language-switcher/language-switcher.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../Services/Language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html'
})

export class LanguageSwitcherComponent {
  private languageService = inject(LanguageService);

  languages = this.languageService.getSupportedLanguages();
  currentLang = this.languageService.getCurrentLanguage();

  switchLanguage(): void {
    if(this.currentLang === 'en'){
      this.languageService.setLanguage('ar')
      this.currentLang = 'ar'
    } else {
       this.currentLang = 'en';
         this.languageService.setLanguage('en')
    }
  }
}

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-hero',
  imports: [CarouselModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  //  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeroComponent {
  customOptions!: OwlOptions;

  constructor(private translate: TranslateService) {
    this.setCarouselOptions(this.translate.currentLang);

    //when langauge change
    this.translate.onLangChange.subscribe(event => {
      this.setCarouselOptions(event.lang);
    });
  }

  setCarouselOptions(lang: string) {
    const isRTL = lang === 'ar';

    this.customOptions = {
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      smartSpeed: 1000,
      rtl: isRTL,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      items: 1,
      nav: false
    };
  }
}

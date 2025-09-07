import { Component } from '@angular/core';
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
  customOptions: OwlOptions = {
    loop: true,                     // infinite looping
    autoplay: true,                 // enable auto play
    autoplayTimeout: 20000,          // 3s per slide
    autoplayHoverPause: true,
    smartSpeed: 1000,                 // 👈 smooth transition speed

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,                    // 👈 margin between items
    navSpeed: 700,
   items: 1,
  nav: false
  }
}

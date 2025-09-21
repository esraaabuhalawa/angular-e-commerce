import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { Category } from '../../../../core/models/category.interface';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule, RouterLink],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss',
  //  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PopularCategoriesComponent implements OnInit, OnDestroy {
  categoriesList: Category[] = [];
  categoriesSubscribe: Subscription | null = null;

  private readonly categoriesService = inject(CategoriesService);

  getCategories() {
    this.categoriesSubscribe = this.categoriesService.getAllCategories().subscribe(
      {
        next: (res) => {
          this.categoriesList = res.data;
          // console.log(res.data)
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }
  ngOnInit(): void {
    this.getCategories();
  }
  ngOnDestroy(): void {
    if (this.categoriesSubscribe) {
      this.categoriesSubscribe.unsubscribe();
    }
  }

  customOptions: OwlOptions = {
    loop: true,                     // infinite looping
    autoplay: true,                 // enable auto play
    autoplayTimeout: 4000,          // 3s per slide
    autoplayHoverPause: true,
    smartSpeed: 800,                 // 👈 smooth transition speed
    animateOut: 'fadeOut',           // 👈 optional smooth fade
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 20,                      // 👈 margin between items
    navSpeed: 900,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],             // 👈 custom arrows
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1400: {
        items: 5
      }
    },
    nav: true
  }

}



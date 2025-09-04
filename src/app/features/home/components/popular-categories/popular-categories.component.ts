import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { Category } from '../../../../core/models/category.interface';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [ CarouselModule ],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss',
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PopularCategoriesComponent implements OnInit , OnDestroy {
  categoriesList:Category[] = [];
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
    if(this.categoriesSubscribe){
       this.categoriesSubscribe.unsubscribe();
    }
  }
 customOptions: OwlOptions = {
    loop: true,              // infinite looping
  autoplay: true,          // 👈 enable auto play
  autoplayTimeout:3000,   // 👈 3s per slide (default: 5000)
  autoplayHoverPause: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}



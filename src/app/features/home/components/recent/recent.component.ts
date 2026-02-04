import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.interface';
import { Subscription } from 'rxjs';
import { ProductCardComponent } from "../../../../shared/components/product-card/product-card.component";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-recent',
  imports: [CommonModule, ProductCardComponent, CarouselModule, RouterLink, TranslateModule],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.scss',
})
export class RecentComponent implements OnInit, OnDestroy {
  private readonly productService = inject(ProductsService);
  productsList: Product[] = [];
  getProducts: Subscription | null = null;
  customOptions!: OwlOptions;
  isLoading = false;
  errorMessage = '';

  constructor(private translate: TranslateService) {
    this.setCarouselOptions(this.translate.currentLang);

    // When language changes
    this.translate.onLangChange.subscribe(event => {
      this.setCarouselOptions(event.lang);
    });
  }

  fetchProducts() {
    this.isLoading = true;
    this.errorMessage = '';

    this.getProducts = this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        console.log('API Response:', res);

        // Check if res.data exists and is an array
        if (res && res.data && Array.isArray(res.data)) {
          // Use slice instead of splice to avoid mutating the original array
          this.productsList = res.data.slice(0, 10);
        } else {
          console.error('Unexpected API response structure:', res);
          this.errorMessage = 'Invalid data format received';
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('API Error:', error);
        this.errorMessage = error.message || 'Failed to load products';
        this.isLoading = false;

        // More detailed error logging
        if (error.status === 500) {
          console.error('Server error (500). Check backend logs.');
        }
      },
    });
  }

  // Carousel Options
  setCarouselOptions(lang: string) {
    const isRTL = lang === 'ar';
    this.customOptions = {
      loop: true,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      smartSpeed: 1000,
      animateOut: 'fadeOut',
      mouseDrag: true,
      touchDrag: true,
      rtl: isRTL,
      pullDrag: true,
      dots: false,
      margin: 30,
      navSpeed: 700,
      navText: [
        '<i class="fa-solid fa-arrow-left"></i>',
        '<i class="fa-solid fa-arrow-right"></i>'
      ],
      responsive: {
        0: {
          items: 1,
          center: true
        },
        400: {
          items: 1,
          center: true
        },
        740: {
          items: 3
        },
        1200: {
          items: 4
        },
      },
      nav: true
    };
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngOnDestroy(): void {
    if (this.getProducts) {
      this.getProducts.unsubscribe();
    }
  }
}

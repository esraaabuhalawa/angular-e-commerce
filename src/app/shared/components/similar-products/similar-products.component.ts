import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../core/models/product.interface';
import { Subscription } from 'rxjs';
import { ProductCardComponent } from "../product-card/product-card.component";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-similar-products',
  imports: [ProductCardComponent, CarouselModule, TranslateModule],
  templateUrl: './similar-products.component.html',
  styleUrl: './similar-products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SimilarProductsComponent implements OnInit {
  productsList: Product[] = [];
  getProducts: Subscription | null = null;
  customOptions!: OwlOptions;

  @Input() id: string = ''
  private readonly productService = inject(ProductsService);

  constructor(private translate: TranslateService) {
    this.setCarouselOptions(this.translate.currentLang);

    //when langauge change
    this.translate.onLangChange.subscribe(event => {
      this.setCarouselOptions(event.lang);
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  setCarouselOptions(lang: string) {
    const isRTL = lang === 'ar';
    this.customOptions = {
      loop: true,                     // infinite looping
      autoplay: true,                 // enable auto play
      autoplayTimeout: 6000,          // 3s per slide
      autoplayHoverPause: true,
      smartSpeed: 1000,                 //  smooth transition speed
      animateOut: 'fadeOut',           // optional smooth fade
      mouseDrag: true,
      rtl: isRTL,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      margin: 25,                      // margin between items
      navSpeed: 700,
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
        },
      },
      nav: false
    }
  }

  fetchProducts() {
    const filters: any = {};

    if (this.id) {
      // API expects category[in] for filtering
      filters['category[in]'] = [this.id];
    }

    this.getProducts = this.productService.getAllProducts(filters).subscribe({
      next: (res: any) => {
        this.productsList = res.data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getProducts) {
      this.getProducts.unsubscribe();
    }
  }
}
